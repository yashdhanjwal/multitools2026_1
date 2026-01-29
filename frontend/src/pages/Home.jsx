import { Link } from 'react-router-dom';
import {
  FileText, Merge, Scissors, RotateCw, Image, FileImage,
  Type, Download, Lock, Unlock, Hash, FileJson,
  Binary, FileCode, Clipboard, Zap, Languages, Maximize
} from 'lucide-react';

const toolCategories = [
  {
    title: "PDF Tools",
    description: "Manage, convert, and optimize your PDF documents.",
    tools: [
      { id: "merge-pdf", title: "Merge PDF", desc: "Combine multiple PDFs into one.", icon: Merge, color: "bg-blue-500" },
      { id: "split-pdf", title: "Split PDF", desc: "Separate PDF pages into individual files.", icon: Scissors, color: "bg-indigo-500" },
      { id: "compress-pdf", title: "Compress PDF", desc: "Reduce PDF file size without quality loss.", icon: Download, color: "bg-cyan-500" },
      { id: "rotate-pdf", title: "Rotate PDF", desc: "Change the orientation of PDF pages.", icon: RotateCw, color: "bg-sky-500" },
      { id: "unlock-pdf", title: "Unlock PDF", desc: "Remove password protection from PDF.", icon: Unlock, color: "bg-red-500" },
      { id: "watermark-pdf", title: "Watermark PDF", desc: "Add text/image watermark to PDF.", icon: FileCode, color: "bg-orange-500" },
      { id: "pdf-to-word", title: "PDF to Word", desc: "Convert PDF to editable Word doc.", icon: FileText, color: "bg-blue-600" },
      { id: "pdf-to-excel", title: "PDF to Excel", desc: "Extract data from PDF to Excel.", icon: FileText, color: "bg-green-600" },
      { id: "pdf-to-jpg", title: "PDF to JPG", desc: "Save PDF pages as JPG images.", icon: FileImage, color: "bg-yellow-500" },
      { id: "jpg-to-pdf", title: "JPG to PDF", desc: "Convert JPG images to PDF document.", icon: Image, color: "bg-purple-500" },
    ]
  },
  {
    title: "File & Converter Tools",
    description: "Image optimization and file conversion utilities.",
    tools: [
      { id: "image-compressor", title: "Image Compressor", desc: "Compress JPG, PNG, or WebP images.", icon: Zap, color: "bg-orange-400" },
      { id: "image-resizer", title: "Image Resizer", desc: "Resize images to specific dimensions.", icon: Maximize, color: "bg-teal-500" },
      { id: "zip-unzip", title: "ZIP / UNZIP", desc: "Compress or extract ZIP files online.", icon: Download, color: "bg-amber-600" },
      { id: "text-to-pdf", title: "Text to PDF", desc: "Convert plain text into a PDF file.", icon: Type, color: "bg-slate-700" },
    ]
  },
  {
    title: "Utility Tools",
    description: "Everyday web tools for developers and writers.",
    tools: [
      { id: "word-counter", title: "Word Counter", desc: "Count words and characters in text.", icon: Hash, color: "bg-emerald-500" },
      { id: "json-formatter", title: "JSON Formatter", desc: "Prettify and validate JSON data.", icon: FileJson, color: "bg-pink-500" },
      { id: "base64-converter", title: "Base64 Encoder", desc: "Encode or decode Base64 data.", icon: Binary, color: "bg-violet-500" },
      { id: "online-notepad", title: "Online Notepad", desc: "Simple notepad with auto-save.", icon: Clipboard, color: "bg-yellow-600" },
    ]
  }
];

import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div className="pb-20">
      <Helmet>
        <title>Free Online Tools by Yash Dhanjwal | 100% Free PDF & Utility Tools</title>
        <meta name="description" content="Free, fast, and secure online tools for PDF, Images, and Utility tasks. No login required. Merge PDF, Compress PDF, Image Resizer, Word Counter and more." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Free Online Tools by Yash Dhanjwal",
              "url": "https://ft1.yashdhanjwal.com",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0"
              },
              "author": {
                "@type": "Person",
                "name": "Yash Dhanjwal"
              }
            }
          `}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-slate-900 dark:to-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Everything You Need to <span className="text-primary-600">Handle Files</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10">
            Free, fast, and secure online tools for everyday tasks. No installation, no registration, no limits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#pdf-tools" className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
              PDF Tools
            </a>
            <a href="#utility-tools" className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary-500 transition-colors shadow-sm">
              Utility Tools
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {toolCategories.map((category, idx) => (
          <section key={idx} id={category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')} className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{category.title}</h2>
              <p className="text-slate-600 dark:text-slate-400">{category.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
