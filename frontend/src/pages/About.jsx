import ToolPageLayout from '../components/ToolPageLayout';
import { Info } from 'lucide-react';

const About = () => {
  return (
    <ToolPageLayout
      title="About Us"
      description="Learn more about Free Online Tools and our mission."
      icon={Info}
    >
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Free Online Tools by Yash Dhanjwal was created with a simple goal: to provide high-quality, secure, and easy-to-use web tools for everyday tasks without the need for registration or complex software installations.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Privacy First</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          We believe that your data should remain yours. Most of our tools process files directly in your browser, meaning your sensitive documents never even touch our servers. For tools that require server-side processing, we ensure all files are automatically deleted after 30 minutes.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">About the Developer</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Developed by <strong>Yash Dhanjwal</strong>, a B. Tech student based in New Delhi, India. Yash is passionate about creating useful web applications that solve real-world problems.
        </p>
      </div>
    </ToolPageLayout>
  );
};

export default About;
