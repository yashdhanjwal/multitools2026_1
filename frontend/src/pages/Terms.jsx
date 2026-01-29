import ToolPageLayout from '../components/ToolPageLayout';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <ToolPageLayout
      title="Terms of Use"
      description="Guidelines for using our free online tools."
      icon={FileText}
      color="bg-slate-600"
    >
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">By using this website, you agree to comply with and be bound by these terms of use.</p>

        <h2 className="text-xl font-bold mb-4">2. Use of Service</h2>
        <p className="mb-4">Our services are provided "as is" and are free for personal and professional use. We do not guarantee 100% uptime or accuracy for all conversions.</p>

        <h2 className="text-xl font-bold mb-4">3. Prohibited Use</h2>
        <p className="mb-4">You may not use our tools for any illegal purposes or to process malicious files.</p>

        <h2 className="text-xl font-bold mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">Yash Dhanjwal shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools.</p>
      </div>
    </ToolPageLayout>
  );
};

export default Terms;
