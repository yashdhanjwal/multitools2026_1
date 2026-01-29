import JSZip from 'jszip';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export const zipFiles = async (files) => {
  const zip = new JSZip();
  files.forEach(file => {
    zip.file(file.name, file);
  });
  return await zip.generateAsync({ type: "blob" });
};

export const unzipFile = async (file) => {
  const zip = new JSZip();
  const content = await zip.loadAsync(file);
  const extractedFiles = [];
  for (const [filename, fileData] of Object.entries(content.files)) {
    if (!fileData.dir) {
      const blob = await fileData.async("blob");
      extractedFiles.push(new File([blob], filename, { type: "application/octet-stream" }));
    }
  }
  return extractedFiles;
};

export const textToPDF = async (text) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let page = pdfDoc.addPage();
  const { height } = page.getSize();
  const fontSize = 12;

  const lines = text.split('\n');
  let y = height - 50;

  lines.forEach(line => {
    if (y < 50) {
      page = pdfDoc.addPage();
      y = height - 50;
    }
    page.drawText(line, {
      x: 50,
      y: y,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 5;
  });

  return await pdfDoc.save();
};

export const countWords = (text) => {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return {
    words: words.length,
    characters: text.length,
    sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  };
};

export const formatJSON = (text) => {
  try {
    const obj = JSON.parse(text);
    return JSON.stringify(obj, null, 2);
  } catch (err) {
    console.error(err);
    throw new Error("Invalid JSON data");
  }
};

export const base64Encode = (text) => btoa(text);
export const base64Decode = (text) => {
  try {
    return atob(text);
  } catch (err) {
    console.error(err);
    throw new Error("Invalid Base64 string");
  }
};
