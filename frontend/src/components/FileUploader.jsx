import { useState, useRef } from 'react';
import { Upload, File, X, AlertCircle, Loader2 } from 'lucide-react';

const FileUploader = ({
  accept = "*",
  multiple = false,
  onFilesSelected,
  maxFiles = 10,
  description = "Drag & drop files here or click to browse"
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    setError("");
    let updatedFiles = multiple ? [...files, ...newFiles] : [newFiles[0]];

    if (multiple && updatedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 flex flex-col items-center justify-center ${
          dragActive
            ? "border-primary-500 bg-primary-50/50 dark:bg-primary-900/10"
            : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />

        <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full mb-4">
          <Upload className="w-8 h-8 text-primary-600" />
        </div>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          {description}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs">
          Fast and 100% secure. Your files never leave your browser for basic tools.
        </p>

        <button
          onClick={() => inputRef.current.click()}
          className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          Select Files
        </button>

        {error && (
          <div className="mt-4 flex items-center space-x-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-3">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider px-1">
            Selected Files ({files.length})
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl group hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <File className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
