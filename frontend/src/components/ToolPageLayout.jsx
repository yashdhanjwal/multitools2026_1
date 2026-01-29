import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ToolPageLayout = ({
  title,
  description,
  children,
  icon: Icon,
  color = "bg-primary-600"
}) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{title} | Free Online Tools</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all tools
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="p-8 sm:p-12 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-500/20`}>
                {Icon && <Icon className="w-8 h-8" />}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-slate-50/50 dark:bg-slate-900/50">
            {children}
          </div>
        </div>

        {/* How it works / Info section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% Secure</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Processing is done in your browser. We don't store your sensitive data.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Completely Free</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">All tools are free to use without any limitations or registrations.</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fast & Easy</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Optimized algorithms ensure quick processing times for all tasks.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPageLayout;
