import { jsPDF } from 'jspdf';
import { ATSAnalysisData } from '@/types/resume';

export function generateATSReportPDF(data: ATSAnalysisData, fileName: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  const addNewPage = () => {
    doc.addPage();
    cursorY = margin;
  };

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin - 12) {
      addNewPage();
    }
  };

  const addText = (
    text: string,
    x: number,
    fontSize: number,
    isBold: boolean = false,
    color: number[] = [15, 23, 42],
    maxWidth: number = contentWidth - (x - margin)
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    checkPageBreak(lines.length * (fontSize * 0.4) + 2);
    doc.text(lines, x, cursorY);
    cursorY += lines.length * (fontSize * 0.4) + 3;
  };

  const addDivider = () => {
    checkPageBreak(6);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 6;
  };

  // 1. BRAND HEADER
  doc.setFillColor(15, 23, 42); // Deep navy/black
  doc.roundedRect(margin, cursorY, contentWidth, 24, 2, 2, 'F');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('CEVORA', margin + 6, cursorY + 10);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('ATS Resume & Career Readiness Report', margin + 6, cursorY + 17);

  const genDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text(`Generated: ${genDate}`, pageWidth - margin - 6, cursorY + 10, { align: 'right' });
  doc.text(`File: ${fileName}`, pageWidth - margin - 6, cursorY + 17, { align: 'right' });

  cursorY += 30;

  // 2. EXECUTIVE SUMMARY
  addText('Executive Summary', margin, 14, true, [15, 23, 42]);

  // Summary box
  checkPageBreak(30);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, cursorY, contentWidth, 22, 2, 2, 'FD');

  // Overall Score inside box
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  const scoreColor: [number, number, number] =
    data.overallScore >= 80 ? [16, 185, 129] : data.overallScore >= 60 ? [245, 158, 11] : [239, 68, 68];
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`${data.overallScore}`, margin + 6, cursorY + 12);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('/ 100 ATS', margin + 6, cursorY + 18);

  // Stats next to score
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`Overall Rating: ${data.rating}`, margin + 35, cursorY + 8);
  doc.text(`Candidate Standing: ${data.percentile}`, margin + 35, cursorY + 13);
  doc.text(`Interview Readiness: ${data.interviewReadiness}%`, margin + 35, cursorY + 18);

  cursorY += 27;

  // Executive Description
  const missingSummary = data.missingKeywords && data.missingKeywords.length > 0
    ? data.missingKeywords.slice(0, 2).map((k) => k.word).join(' and ')
    : 'high-priority target technologies';

  const execSummary = `Your resume scores ${data.overallScore}/100, indicating it is ${data.rating.toLowerCase()}. ${data.recommendation}

While your structural layout and foundational credentials provide solid parsing signals, addressing missing keywords such as ${missingSummary} and implementing the action items detailed below will substantially enhance your recruiter interview callback rate.`;

  addText(execSummary, margin, 9.5, false, [51, 65, 85]);
  cursorY += 3;
  addDivider();

  // 3. SCORE BREAKDOWN
  addText('Score Breakdown', margin, 13, true, [15, 23, 42]);
  data.scoreBreakdown.forEach((cat) => {
    checkPageBreak(9);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(cat.name, margin + 2, cursorY);

    const catScoreColor: [number, number, number] =
      cat.score >= 80 ? [16, 185, 129] : cat.score >= 70 ? [245, 158, 11] : [239, 68, 68];
    doc.setTextColor(catScoreColor[0], catScoreColor[1], catScoreColor[2]);
    doc.text(`${cat.score}%`, margin + 50, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8.5);
    const descLines = doc.splitTextToSize(cat.description, contentWidth - 65);
    doc.text(descLines, margin + 65, cursorY);

    cursorY += descLines.length * 3.5 + 3;
  });

  cursorY += 2;
  addDivider();

  // 4. KEYWORD & SKILL OPTIMIZATION
  addText('Keyword & Skill Optimization', margin, 13, true, [15, 23, 42]);

  // Detected skills (fixed mapping: array of SkillMatch objects)
  const detectedNames = data.detectedSkills
    .map((s) => (typeof s === 'string' ? s : s.name))
    .filter(Boolean);

  const missingNames = data.missingSkills
    .map((s) => (typeof s === 'string' ? s : s.name))
    .filter(Boolean);

  addText(`Matched Skills (${detectedNames.length} identified):`, margin + 2, 10, true, [16, 185, 129]);
  addText(detectedNames.join(' • ') || 'None identified', margin + 6, 9, false, [51, 65, 85]);
  cursorY += 2;

  addText(`Missing / Recommended Skills (${missingNames.length} suggestions):`, margin + 2, 10, true, [239, 68, 68]);
  addText(
    (missingNames.join(' • ') || 'None') + ' (Add only if you genuinely possess or learn these technologies)',
    margin + 6,
    9,
    false,
    [100, 116, 139]
  );
  cursorY += 4;

  // Keywords
  addText(
    `Keyword Match: ${data.keywordMatchPercentage}% | Keyword Density: ${data.keywordDensity}`,
    margin + 2,
    9.5,
    true,
    [30, 41, 59]
  );
  cursorY += 1;

  if (data.missingKeywords && data.missingKeywords.length > 0) {
    addText('High-Demand Missing Keywords:', margin + 2, 9.5, true, [245, 158, 11]);
    data.missingKeywords.forEach((kw) => {
      checkPageBreak(5);
      const freqText = kw.frequency ? ` — ${kw.frequency}` : '';
      addText(`• ${kw.word} [${kw.importance}]${freqText}`, margin + 6, 8.5, false, [71, 85, 105]);
    });
  }

  cursorY += 3;
  addDivider();

  // 5. SECTION ANALYSIS
  addText('Section Analysis', margin, 13, true, [15, 23, 42]);
  data.sectionAnalysis.forEach((sec) => {
    checkPageBreak(25);
    const secColor: [number, number, number] =
      sec.score >= 80 ? [16, 185, 129] : sec.score >= 70 ? [245, 158, 11] : [239, 68, 68];

    addText(`${sec.name} — Score: ${sec.score}% (${sec.status.toUpperCase()})`, margin + 2, 10.5, true, secColor);

    if (sec.strengths && sec.strengths.length > 0) {
      addText('Strengths:', margin + 6, 8.5, true, [16, 185, 129]);
      sec.strengths.forEach((s) => addText(`+ ${s}`, margin + 10, 8.5, false, [51, 65, 85]));
    }

    if (sec.weaknesses && sec.weaknesses.length > 0) {
      addText('Weaknesses:', margin + 6, 8.5, true, [239, 68, 68]);
      sec.weaknesses.forEach((w) => addText(`- ${w}`, margin + 10, 8.5, false, [51, 65, 85]));
    }

    if (sec.suggestions && sec.suggestions.length > 0) {
      addText('Recommendations:', margin + 6, 8.5, true, [245, 158, 11]);
      sec.suggestions.forEach((r) => addText(`* ${r}`, margin + 10, 8.5, false, [51, 65, 85]));
    }

    if (sec.beforeExample && sec.afterExample) {
      checkPageBreak(18);
      addText('Suggested Revision Example:', margin + 6, 8.5, true, [59, 130, 246]);
      addText(`Original: "${sec.beforeExample}"`, margin + 10, 8, false, [148, 163, 184]);
      addText(`Optimized: "${sec.afterExample}"`, margin + 10, 8, true, [16, 185, 129]);
    }

    cursorY += 2;
  });

  cursorY += 3;
  addDivider();

  // 6. ACTION PLAN / IMPROVEMENT SUGGESTIONS
  addText('Action Plan (AI Improvement Suggestions)', margin, 13, true, [15, 23, 42]);
  data.suggestions.forEach((sug) => {
    checkPageBreak(18);
    const prioColor: [number, number, number] =
      sug.priority === 'high' ? [239, 68, 68] : sug.priority === 'medium' ? [245, 158, 11] : [59, 130, 246];

    addText(
      `[${sug.priority.toUpperCase()}] ${sug.title} (${sug.estimatedImprovement})`,
      margin + 2,
      9.5,
      true,
      prioColor
    );
    addText(sug.explanation, margin + 6, 8.5, false, [71, 85, 105]);
    addText(`Expected Recruiter Impact: ${sug.impact}`, margin + 6, 8, true, [16, 185, 129]);
    cursorY += 2;
  });

  // 7. FOOTER FOR ALL PAGES
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text('Cevora AI Career Platform • Confidential ATS Report', margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, '');
  if (typeof window !== 'undefined') {
    doc.save(`Cevora_ATS_Report_${safeName}.pdf`);
  }
  return doc;
}
