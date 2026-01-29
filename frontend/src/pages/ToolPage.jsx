import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ToolPageLayout from '../components/ToolPageLayout';
import FileUploader from '../components/FileUploader';
import {
  Merge, Scissors, RotateCw, Download, Loader2,
  AlertCircle, Lock, Unlock, FileCode, Type,
  FileText, FileImage, Image as ImageIcon, Zap, Maximize,
  Hash, FileJson, Binary, Clipboard, Copy, Check, Save
} from 'lucide-react';
import * as pdfTools from '../tools/pdfTools';
import * as imageTools from '../tools/imageTools';
import * as documentTools from '../tools/documentTools';
import * as utilityTools from '../tools/utilityTools';
import JSZip from 'jszip';

const ToolPage = () => {
  const { toolId } = useParams();
  const [files, setFiles] = useState([]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    password: "",
    watermarkText: "CONFIDENTIAL",
    rotation: 90,
    imageFormat: 'jpeg',
    maxSizeMB: 1,
    width: 800,
    height: 600,
    base64Mode: 'encode'
  });

  useEffect(() => {
    setFiles([]);
    setError("");
    setResult(null);
    setCopied(false);

    if (toolId === 'online-notepad') {
      const saved = localStorage.getItem('online-notepad-content');
      if (saved) setInputText(saved);
    } else {
      setInputText("");
    }
  }, [toolId]);

  useEffect(() => {
    if (toolId === 'online-notepad') {
      localStorage.setItem('online-notepad-content', inputText);
    }
  }, [inputText, toolId]);

  const getToolInfo = () => {
    const tools = {
      'merge-pdf': { title: 'Merge PDF', desc: 'Combine multiple PDF documents into one.', icon: Merge, color: 'bg-blue-500', accept: '.pdf', multiple: true },
      'split-pdf': { title: 'Split PDF', desc: 'Separate PDF pages into individual files.', icon: Scissors, color: 'bg-indigo-500', accept: '.pdf' },
      'rotate-pdf': { title: 'Rotate PDF', desc: 'Change the orientation of PDF pages.', icon: RotateCw, color: 'bg-sky-500', accept: '.pdf' },
      'unlock-pdf': { title: 'Unlock PDF', desc: 'Remove password protection from PDF.', icon: Unlock, color: 'bg-red-500', accept: '.pdf' },
      'watermark-pdf': { title: 'Watermark PDF', desc: 'Add text watermark to your PDF.', icon: FileCode, color: 'bg-orange-500', accept: '.pdf' },
      'compress-pdf': { title: 'Compress PDF', desc: 'Reduce PDF file size.', icon: Download, color: 'bg-cyan-500', accept: '.pdf' },
      'jpg-to-pdf': { title: 'JPG to PDF', desc: 'Convert JPG images to PDF document.', icon: ImageIcon, color: 'bg-purple-500', accept: 'image/*', multiple: true },
      'pdf-to-jpg': { title: 'PDF to JPG', desc: 'Save PDF pages as JPG images.', icon: FileImage, color: 'bg-yellow-500', accept: '.pdf' },
      'pdf-to-word': { title: 'PDF to Word', desc: 'Convert PDF to editable Word document.', icon: FileText, color: 'bg-blue-600', accept: '.pdf' },
      'pdf-to-excel': { title: 'PDF to Excel', desc: 'Extract PDF data to Excel (CSV).', icon: FileText, color: 'bg-green-600', accept: '.pdf' },
      'image-compressor': { title: 'Image Compressor', desc: 'Compress JPG/PNG images to smaller size.', icon: Zap, color: 'bg-orange-400', accept: 'image/*' },
      'image-resizer': { title: 'Image Resizer', desc: 'Resize images to custom dimensions.', icon: Maximize, color: 'bg-teal-500', accept: 'image/*' },
      'zip-unzip': { title: 'ZIP / UNZIP', desc: 'Compress or extract ZIP files online.', icon: Download, color: 'bg-amber-600', accept: '*', multiple: true },
      'text-to-pdf': { title: 'Text to PDF', desc: 'Convert plain text into a PDF file.', icon: Type, color: 'bg-slate-700', type: 'text' },
      'word-counter': { title: 'Word Counter', desc: 'Count words, characters and sentences.', icon: Hash, color: 'bg-emerald-500', type: 'text', action: 'calculate' },
      'json-formatter': { title: 'JSON Formatter', desc: 'Prettify and validate your JSON data.', icon: FileJson, color: 'bg-pink-500', type: 'text', action: 'calculate' },
      'base64-converter': { title: 'Base64 Converter', desc: 'Encode or decode text to Base64 format.', icon: Binary, color: 'bg-violet-500', type: 'text', action: 'calculate' },
      'online-notepad': { title: 'Online Notepad', desc: 'A simple notepad that auto-saves your notes locally.', icon: Clipboard, color: 'bg-yellow-600', type: 'text', action: 'none' },
    };
    return tools[toolId] || { title: 'Tool', desc: 'Process your files.', icon: Download, color: 'bg-primary-600', accept: '*' };
  };

  const toolInfo = getToolInfo();

  const handleProcess = async () => {
    if (toolInfo.type === 'text' && !inputText) return;
    if (toolInfo.type !== 'text' && files.length === 0) return;

    setProcessing(true);
    setError("");

    try {
      let resultData;
      let fileName = "processed";
      let downloadType = "application/octet-stream";
      let isDownload = true;

      switch (toolId) {
        case 'merge-pdf':
          resultData = await pdfTools.mergePDFs(files);
          fileName = "merged.pdf";
          downloadType = "application/pdf";
          break;
        case 'split-pdf':
          resultData = await pdfTools.splitPDF(files[0]);
          if (resultData instanceof Blob && resultData.type === "application/zip") {
            fileName = `split-${files[0].name.replace('.pdf', '')}.zip`;
            downloadType = "application/zip";
          } else {
            fileName = `split-${files[0].name}`;
            downloadType = "application/pdf";
          }
          break;
        case 'rotate-pdf':
          resultData = await pdfTools.rotatePDF(files[0], options.rotation);
          fileName = `rotated-${files[0].name}`;
          downloadType = "application/pdf";
          break;
        case 'unlock-pdf':
          resultData = await pdfTools.unlockPDF(files[0], options.password);
          fileName = `unlocked-${files[0].name}`;
          downloadType = "application/pdf";
          break;
        case 'watermark-pdf':
          resultData = await pdfTools.watermarkPDF(files[0], options.watermarkText);
          fileName = `watermarked-${files[0].name}`;
          downloadType = "application/pdf";
          break;
        case 'compress-pdf':
          resultData = await pdfTools.compressPDF(files[0]);
          fileName = `compressed-${files[0].name}`;
          downloadType = "application/pdf";
          break;
        case 'jpg-to-pdf':
          resultData = await pdfTools.jpgToPDF(files);
          fileName = "converted.pdf";
          downloadType = "application/pdf";
          break;
        case 'pdf-to-jpg': {
          const images = await imageTools.pdfToImages(files[0], options.imageFormat);
          if (images.length === 1) {
            resultData = dataURLtoBlob(images[0].dataUrl);
            fileName = images[0].name;
            downloadType = `image/${options.imageFormat}`;
          } else {
            const zip = new JSZip();
            images.forEach(img => {
              const base64Data = img.dataUrl.split(',')[1];
              zip.file(img.name, base64Data, { base64: true });
            });
            resultData = await zip.generateAsync({ type: "blob" });
            fileName = "images.zip";
            downloadType = "application/zip";
          }
          break;
        }
        case 'pdf-to-word':
          resultData = await documentTools.pdfToWord(files[0]);
          fileName = files[0].name.replace('.pdf', '.doc');
          downloadType = "application/msword";
          break;
        case 'pdf-to-excel':
          resultData = await documentTools.pdfToExcel(files[0]);
          fileName = files[0].name.replace('.pdf', '.csv');
          downloadType = "text/csv";
          break;
        case 'image-compressor':
          resultData = await imageTools.compressImage(files[0], { maxSizeMB: options.maxSizeMB });
          fileName = `compressed-${files[0].name}`;
          downloadType = files[0].type;
          break;
        case 'image-resizer':
          resultData = await imageTools.resizeImage(files[0], options.width, options.height);
          fileName = `resized-${files[0].name}`;
          downloadType = files[0].type;
          break;
        case 'zip-unzip':
          if (files[0].name.endsWith('.zip')) {
            const extracted = await utilityTools.unzipFile(files[0]);
            if (extracted.length > 0) {
              resultData = extracted[0];
              fileName = extracted[0].name;
            } else {
              throw new Error("Empty ZIP file");
            }
          } else {
            resultData = await utilityTools.zipFiles(files);
            fileName = "files.zip";
            downloadType = "application/zip";
          }
          break;
        case 'text-to-pdf':
          resultData = await utilityTools.textToPDF(inputText);
          fileName = "document.pdf";
          downloadType = "application/pdf";
          break;
        case 'word-counter':
          resultData = utilityTools.countWords(inputText);
          isDownload = false;
          break;
        case 'json-formatter':
          resultData = utilityTools.formatJSON(inputText);
          isDownload = false;
          break;
        case 'base64-converter':
          resultData = options.base64Mode === 'encode'
            ? utilityTools.base64Encode(inputText)
            : utilityTools.base64Decode(inputText);
          isDownload = false;
          break;
        default:
          throw new Error("Tool not implemented yet");
      }

      if (isDownload) {
        downloadFile(resultData, fileName, downloadType);
      } else {
        setResult(resultData);
      }
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message || "Processing failed"}.`);
    } finally {
      setProcessing(false);
    }
  };

  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  const downloadFile = (data, fileName, type) => {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = typeof result === 'string' ? result : JSON.stringify(result);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title={toolInfo.title}
      description={toolInfo.desc}
      icon={toolInfo.icon}
      color={toolInfo.color}
    >
      <div className="space-y-8">
        {toolInfo.type === 'text' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {toolId === 'online-notepad' ? 'Your Notes (Auto-saved)' : 'Input Text'}
              </label>
              {inputText && (
                <button
                  onClick={() => setInputText("")}
                  className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-mono text-sm leading-relaxed"
              placeholder={toolId === 'online-notepad' ? "Start typing your notes..." : "Type or paste your text here..."}
            />
            {toolId === 'online-notepad' && (
              <div className="flex items-center space-x-2 text-xs text-green-500 font-medium">
                <Save className="w-3 h-3" />
                <span>Auto-saved to local storage</span>
              </div>
            )}
          </div>
        ) : (
          <FileUploader
            multiple={toolInfo.multiple}
            onFilesSelected={setFiles}
            accept={toolInfo.accept}
          />
        )}

        {(files.length > 0 || (inputText && toolId !== 'online-notepad')) && (
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Options</h3>

            {toolId === 'unlock-pdf' && (
              <div className="space-y-2">
                <label className="text-sm text-slate-500">PDF Password</label>
                <input
                  type="password"
                  value={options.password}
                  onChange={(e) => setOptions({...options, password: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                  placeholder="Enter password..."
                />
              </div>
            )}

            {toolId === 'watermark-pdf' && (
              <div className="space-y-2">
                <label className="text-sm text-slate-500">Watermark Text</label>
                <input
                  type="text"
                  value={options.watermarkText}
                  onChange={(e) => setOptions({...options, watermarkText: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                  placeholder="Enter text..."
                />
              </div>
            )}

            {toolId === 'rotate-pdf' && (
              <div className="space-y-2">
                <label className="text-sm text-slate-500">Rotation Angle</label>
                <select
                  value={options.rotation}
                  onChange={(e) => setOptions({...options, rotation: parseInt(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                >
                  <option value="90">90° Clockwise</option>
                  <option value="180">180°</option>
                  <option value="270">270° Counter-Clockwise</option>
                </select>
              </div>
            )}

            {toolId === 'pdf-to-jpg' && (
              <div className="space-y-2">
                <label className="text-sm text-slate-500">Image Format</label>
                <select
                  value={options.imageFormat}
                  onChange={(e) => setOptions({...options, imageFormat: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                >
                  <option value="jpeg">JPG</option>
                  <option value="png">PNG</option>
                </select>
              </div>
            )}

            {toolId === 'image-compressor' && (
              <div className="space-y-2">
                <label className="text-sm text-slate-500">Max Size (MB)</label>
                <input
                  type="number"
                  step="0.1"
                  value={options.maxSizeMB}
                  onChange={(e) => setOptions({...options, maxSizeMB: parseFloat(e.target.value)})}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                />
              </div>
            )}

            {toolId === 'image-resizer' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-500">Width (px)</label>
                  <input
                    type="number"
                    value={options.width}
                    onChange={(e) => setOptions({...options, width: parseInt(e.target.value)})}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-500">Height (px)</label>
                  <input
                    type="number"
                    value={options.height}
                    onChange={(e) => setOptions({...options, height: parseInt(e.target.value)})}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent"
                  />
                </div>
              </div>
            )}

            {toolId === 'base64-converter' && (
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={options.base64Mode === 'encode'}
                    onChange={() => setOptions({...options, base64Mode: 'encode'})}
                    className="text-primary-600"
                  />
                  <span className="text-sm">Encode</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={options.base64Mode === 'decode'}
                    onChange={() => setOptions({...options, base64Mode: 'decode'})}
                    className="text-primary-600"
                  />
                  <span className="text-sm">Decode</span>
                </label>
              </div>
            )}

            {!['unlock-pdf', 'watermark-pdf', 'rotate-pdf', 'pdf-to-jpg', 'image-compressor', 'image-resizer', 'base64-converter'].includes(toolId) && (
              <p className="text-sm text-slate-500">No additional options required for this tool.</p>
            )}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center space-x-3 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-primary-100 dark:border-primary-900/30 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Result</span>
              </h3>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Result"}</span>
              </button>
            </div>

            {toolId === 'word-counter' ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-primary-600">{result.words}</div>
                  <div className="text-xs text-slate-500 uppercase">Words</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-primary-600">{result.characters}</div>
                  <div className="text-xs text-slate-500 uppercase">Chars</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-primary-600">{result.sentences}</div>
                  <div className="text-xs text-slate-500 uppercase">Sentences</div>
                </div>
              </div>
            ) : (
              <pre className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
                {result}
              </pre>
            )}
          </div>
        )}

        {(files.length > 0 || (inputText && toolId !== 'online-notepad')) && (
          <div className="flex justify-center">
            <button
              onClick={handleProcess}
              disabled={processing}
              className="group px-10 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
            >
              {processing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <toolInfo.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span>{processing ? "Processing..." : `${toolInfo.action === 'calculate' ? 'Calculate' : 'Process'} ${toolInfo.title}`}</span>
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ToolPage;
