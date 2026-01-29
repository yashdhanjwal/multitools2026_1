import ToolPageLayout from '../components/ToolPageLayout';
import { ShieldCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <ToolPageLayout
      title="Privacy Policy"
      description="How we handle your data and protect your privacy."
      icon={ShieldCheck}
      color="bg-emerald-600"
    >
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold mb-4">1. Data Processing</h2>
        <p className="mb-4">Most processing is done client-side. This means your files never leave your computer. For tools that require server processing, files are stored temporarily and deleted automatically.</p>

        <h2 className="text-xl font-bold mb-4">2. File Storage</h2>
        <p className="mb-4">We do not store any files permanently. Uploaded files are deleted from our servers every 30 minutes.</p>

        <h2 className="text-xl font-bold mb-4">3. No User Tracking</h2>
        <p className="mb-4">We do not require any registration or login. We do not use persistent cookies to track individual users.</p>

        <h2 className="text-xl font-bold mb-4">4. Third-Party Services</h2>
        <p className="mb-4">We may use standard analytics tools (like Google Analytics) to understand general traffic patterns and improve our services.</p>
      </div>
    </ToolPageLayout>
  );
};

export default Privacy;
