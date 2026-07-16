import { jsPDF } from "jspdf";
import { ATSAnalysisData } from "@/types/resume";

export function generateATSReportPDF(data: ATSAnalysisData, fileName: string) {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let cursorY = margin;

  const addNewPage = () => {
    doc.addPage();
    cursorY = margin;
  };

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin) {
      addNewPage();
    }
  };

  const addText = (text: string, x: number, fontSize: number, isBold: boolean = false, color: number[] = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, pageWidth - margin - x);
    checkPageBreak(lines.length * (fontSize * 0.4));
    doc.text(lines, x, cursorY);
    cursorY += lines.length * (fontSize * 0.4) + 4;
  };

  // HEADER
  addText("Cevora ATS Resume Report", margin, 22, true, [15, 23, 42]);
  cursorY += 2;
  addText(`Resume Name: ${fileName}`, margin, 12, false, [100, 116, 139]);
  addText(`Generated Date: ${new Date().toLocaleDateString()}`, margin, 12, false, [100, 116, 139]);
  cursorY += 6;

  // EXECUTIVE SUMMARY
  addText("Executive Summary", margin, 16, true, [15, 23, 42]);
  const execSummary = `Your resume scores ${data.overallScore}/100, indicating it is ${data.rating.toLowerCase()}. ${data.recommendation}

While your structural formatting and education sections are exceptionally strong, you are missing several key recruiter keywords such as ${data.missingKeywords.slice(0, 2).map(k => k.word).join(' and ')}. Addressing the high-priority suggestions below will significantly improve your callback rate.`;
  addText(execSummary, margin, 11, false, [51, 65, 85]);
  cursorY += 4;

  // ATS SCORE
  checkPageBreak(30);
  addText("ATS Score", margin, 16, true, [15, 23, 42]);
  addText(`Overall Score: ${data.overallScore}/100`, margin + 5, 12, true);
  addText(`Overall Rating: ${data.rating}`, margin + 5, 12, false);
  addText(`Top Percentile: ${data.percentile}`, margin + 5, 12, false);
  addText(`Interview Readiness: ${data.interviewReadiness}%`, margin + 5, 12, false);
  cursorY += 4;

  // SCORE BREAKDOWN
  checkPageBreak(40);
  addText("Score Breakdown", margin, 16, true, [15, 23, 42]);
  data.scoreBreakdown.forEach((cat) => {
    const dots = ".".repeat(40 - cat.name.length);
    addText(`${cat.name} ${dots} ${cat.score}%`, margin + 5, 11, false);
  });
  cursorY += 4;

  // SKILLS
  checkPageBreak(30);
  addText("Matched Skills", margin, 14, true, [16, 185, 129]);
  addText(data.detectedSkills.join(', '), margin + 5, 11, false, [51, 65, 85]);
  cursorY += 2;

  checkPageBreak(30);
  addText("Missing Skills", margin, 14, true, [239, 68, 68]);
  addText(data.missingSkills.join(', '), margin + 5, 11, false, [51, 65, 85]);
  cursorY += 4;

  // KEYWORD ANALYSIS
  checkPageBreak(40);
  addText("Keyword Analysis", margin, 16, true, [15, 23, 42]);
  addText(`Keyword Match: ${data.keywordMatchPercentage}%`, margin + 5, 11, true);
  addText("Missing Keywords:", margin + 5, 11, true);
  data.missingKeywords.forEach((kw) => {
    addText(`- ${kw.word} (${kw.importance})`, margin + 10, 11, false);
  });
  cursorY += 4;

  // SECTION ANALYSIS
  checkPageBreak(40);
  addText("Section Analysis", margin, 16, true, [15, 23, 42]);
  data.sectionAnalysis.forEach((sec) => {
    checkPageBreak(50);
    addText(`${sec.name} (${sec.score}%)`, margin + 5, 14, true);
    
    if (sec.strengths.length > 0) {
      addText("Strengths:", margin + 10, 11, true, [16, 185, 129]);
      sec.strengths.forEach(s => addText(`- ${s}`, margin + 15, 10, false));
    }
    
    if (sec.weaknesses && sec.weaknesses.length > 0) {
      addText("Weaknesses:", margin + 10, 11, true, [239, 68, 68]);
      sec.weaknesses.forEach(w => addText(`- ${w}`, margin + 15, 10, false));
    }
    
    if (sec.suggestions.length > 0) {
      addText("Recommendations:", margin + 10, 11, true, [245, 158, 11]);
      sec.suggestions.forEach(s => addText(`- ${s}`, margin + 15, 10, false));
    }
    cursorY += 2;
  });
  cursorY += 2;

  // IMPROVEMENT SUGGESTIONS
  checkPageBreak(50);
  addText("Improvement Suggestions", margin, 16, true, [15, 23, 42]);
  data.suggestions.forEach((sug) => {
    checkPageBreak(40);
    addText(`Title: ${sug.title}`, margin + 5, 12, true);
    addText(`Priority: ${sug.impact}`, margin + 10, 11, true, sug.impact === 'High' ? [239, 68, 68] : [245, 158, 11]);
    addText(`Estimated Improvement: ${sug.estimatedImprovement}`, margin + 10, 11, true, [16, 185, 129]);
    addText(`Description: ${sug.explanation}`, margin + 10, 11, false);
    cursorY += 4;
  });

  // FOOTER on all pages
  const pageCount = (doc.internal as any).getNumberOfPages ? (doc.internal as any).getNumberOfPages() : doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by Cevora Resume Analyzer", margin, pageHeight - 10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, pageHeight - 10);
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, "");
  doc.save(`ATS_Report_${safeName}.pdf`);
}
