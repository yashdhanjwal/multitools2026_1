import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Setting worker path is required for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const pdfToWord = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + "\n\n";
  }

  // In a real app we'd use a docx library, but for "real functionality" that is browser-based,
  // we can export as a .doc file (which is often just HTML/Text that Word can read)
  // or just a .txt file. I'll use a simple HTML wrapper for .doc compatibility.
  const docContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Export</title></head>
    <body>${fullText.replace(/\n/g, '<br>')}</body>
    </html>
  `;
  return new Blob([docContent], { type: 'application/msword' });
};

export const pdfToExcel = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let csvContent = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    // Simple table heuristic: items with similar Y coordinates are in the same row
    const items = textContent.items.map(item => ({
      str: item.str,
      x: item.transform[4],
      y: item.transform[5]
    }));

    // Group by Y (with some tolerance)
    const rows = {};
    items.forEach(item => {
      const y = Math.round(item.y);
      if (!rows[y]) rows[y] = [];
      rows[y].push(item);
    });

    // Sort rows by Y descending (top to bottom)
    const sortedY = Object.keys(rows).sort((a, b) => b - a);
    sortedY.forEach(y => {
      // Sort items in row by X
      const rowItems = rows[y].sort((a, b) => a.x - b.x);
      csvContent += rowItems.map(item => `"${item.str.replace(/"/g, '""')}"`).join(',') + "\n";
    });
  }

  return new Blob([csvContent], { type: 'text/csv' });
};
