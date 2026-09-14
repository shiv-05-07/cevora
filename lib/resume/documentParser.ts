import mammoth from 'mammoth';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

export class DocumentParseError extends Error {
  code: string;
  userMessage: string;

  constructor(userMessage: string, code: string = 'DOCUMENT_PARSE_ERROR') {
    super(userMessage);
    this.name = 'DocumentParseError';
    this.code = code;
    this.userMessage = userMessage;
  }
}

export interface DocumentValidationResult {
  valid: boolean;
  error?: string;
  code?: string;
}

export interface ExtractedDocument {
  text: string;
  fileType: 'pdf' | 'docx';
  pageCount?: number;
  wordCount: number;
  characterCount: number;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const MIN_EXTRACTED_TEXT_LENGTH = 50;

/**
 * Validates file size, extension, and MIME type before extraction.
 */
export function validateResumeFile(
  file: File | { name: string; size: number; type?: string }
): DocumentValidationResult {
  if (!file) {
    return { valid: false, error: 'No file provided for analysis.', code: 'NO_FILE' };
  }

  if (file.size <= 0) {
    return { valid: false, error: 'The uploaded file is empty.', code: 'EMPTY_FILE' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(1)}MB.`,
      code: 'FILE_TOO_LARGE',
    };
  }

  const nameLower = (file.name || '').toLowerCase();
  const isPdf = nameLower.endsWith('.pdf');
  const isDocx = nameLower.endsWith('.docx') || nameLower.endsWith('.doc');

  if (!isPdf && !isDocx) {
    return {
      valid: false,
      error: 'Unsupported file format. Please upload a PDF or DOCX file.',
      code: 'UNSUPPORTED_FORMAT',
    };
  }

  const mime = (file.type || '').toLowerCase();
  if (mime) {
    const validMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/octet-stream', // Some OS/browsers send octet-stream for docx/pdf
      'application/x-pdf',
    ];

    const isRecognizedMime = validMimes.some(
      (vm) => mime === vm || mime.includes('pdf') || mime.includes('word') || mime.includes('officedocument')
    );

    if (!isRecognizedMime) {
      return {
        valid: false,
        error: 'Invalid file MIME type. Only PDF and Word (.docx) documents are supported.',
        code: 'INVALID_MIME',
      };
    }
  }

  return { valid: true };
}

/**
 * Configures the worker for pdfjs-dist on Node.js / Windows.
 */
function configurePdfWorker(pdfjs: any) {
  try {
    if (pdfjs.GlobalWorkerOptions?.workerSrc) {
      return;
    }
    const workerPath = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.mjs');
    if (fs.existsSync(workerPath)) {
      pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;
    }
  } catch (err: any) {
    // Non-fatal: pdfjs will attempt its internal fallback
  }
}

/**
 * Extracts plain text from a PDF Buffer using pdfjs-dist.
 * Distinguishes between text-based PDFs and scanned/image-only PDFs.
 */
export async function extractTextFromPdf(buffer: Buffer): Promise<{ text: string; pageCount: number }> {
  const startTime = Date.now();
  let pageCount = 0;

  try {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    configurePdfWorker(pdfjs);

    const data = new Uint8Array(buffer);
    const loadingTask = pdfjs.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true,
      isEvalSupported: false,
    });

    const doc = await loadingTask.promise;
    pageCount = doc.numPages;

    const pageTexts: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => (item && typeof item.str === 'string' ? item.str : ''))
        .join(' ')
        .trim();
      if (pageText) {
        pageTexts.push(pageText);
      }
    }

    const fullText = pageTexts.join('\n\n').trim();

    // Check Case B: Scanned / Image-only PDF with insufficient selectable text
    if (fullText.length < MIN_EXTRACTED_TEXT_LENGTH) {
      console.warn(
        `[DocumentParser: PDF Diagnostic] Scanned/empty PDF detected. (pages: ${pageCount}, extractedChars: ${fullText.length}, durationMs: ${Date.now() - startTime})`
      );
      throw new DocumentParseError(
        'PDF uploaded successfully, but no selectable text could be extracted. Please upload a text-based PDF or DOCX resume.',
        'SCANNED_PDF_NO_TEXT'
      );
    }

    return { text: fullText, pageCount };
  } catch (err: any) {
    if (err instanceof DocumentParseError) {
      throw err;
    }

    const durationMs = Date.now() - startTime;
    console.error(
      `[DocumentParser: PDF Diagnostic] Failed to parse PDF: "${err?.name || 'Error'}: ${err?.message || 'Unknown'}" (pagesDetected: ${pageCount}, durationMs: ${durationMs})`
    );

    throw new DocumentParseError(
      "We couldn't extract text from this PDF. Please try another PDF or upload the DOCX version.",
      'PDF_TEXT_EXTRACTION_FAILED'
    );
  }
}

/**
 * Extracts plain text from a DOCX Buffer using mammoth.
 */
export async function extractTextFromDocx(buffer: Buffer): Promise<{ text: string }> {
  const startTime = Date.now();
  try {
    const result = await mammoth.extractRawText({ buffer });
    const fullText = (result.value || '').trim();

    if (fullText.length < MIN_EXTRACTED_TEXT_LENGTH) {
      throw new DocumentParseError(
        'The uploaded Word document contains insufficient readable text. Please upload a complete resume.',
        'INSUFFICIENT_TEXT'
      );
    }

    return { text: fullText };
  } catch (err: any) {
    if (err instanceof DocumentParseError) {
      throw err;
    }
    console.error(
      `[DocumentParser: DOCX Diagnostic] Failed to parse DOCX: "${err?.name || 'Error'}: ${err?.message || 'Unknown'}" (durationMs: ${Date.now() - startTime})`
    );
    throw new DocumentParseError(
      "Could not parse Word document. The file may be corrupt or an invalid DOCX.",
      'DOCX_CORRUPT'
    );
  }
}

/**
 * High-level extractor: validates and extracts clean text from uploaded resume buffer.
 */
export async function extractResumeContent(
  fileName: string,
  buffer: Buffer
): Promise<ExtractedDocument> {
  const nameLower = (fileName || '').toLowerCase();
  const isPdf = nameLower.endsWith('.pdf');

  let rawText = '';
  let pageCount: number | undefined;

  if (isPdf) {
    const res = await extractTextFromPdf(buffer);
    rawText = res.text;
    pageCount = res.pageCount;
  } else {
    const res = await extractTextFromDocx(buffer);
    rawText = res.text;
  }

  // Normalize whitespace and remove null/control characters
  const cleanedText = rawText
    .replace(/\0/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (cleanedText.length < MIN_EXTRACTED_TEXT_LENGTH) {
    throw new DocumentParseError(
      'The uploaded resume contains insufficient readable text. Please ensure your document has selectable text and is at least 50 characters.',
      'INSUFFICIENT_TEXT'
    );
  }

  const wordCount = cleanedText.split(/\s+/).filter(Boolean).length;

  return {
    text: cleanedText,
    fileType: isPdf ? 'pdf' : 'docx',
    pageCount,
    wordCount,
    characterCount: cleanedText.length,
  };
}
