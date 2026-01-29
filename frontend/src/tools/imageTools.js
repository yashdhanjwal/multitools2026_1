import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import imageCompression from 'browser-image-compression';

// Setting worker path is required for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const pdfToImages = async (file, format = 'jpeg') => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  const images = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    const dataUrl = canvas.toDataURL(`image/${format}`, 0.8);
    images.push({
      name: `page-${i}.${format}`,
      dataUrl
    });
  }
  return images;
};

export const compressImage = async (file, options = { maxSizeMB: 1, maxWidthOrHeight: 1920 }) => {
  return await imageCompression(file, options);
};

export const resizeImage = async (file, width, height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};
