'use client';

let html2pdf;

export async function exportToPdf(elementId, fileName = 'business-plan.pdf') {
  if (typeof window === 'undefined') return;

  const mod = await import('html2pdf.js');
  html2pdf = mod.default || mod;

  const element = document.getElementById(elementId);
  if (!element) return;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  await html2pdf().set(opt).from(element).save();
}
