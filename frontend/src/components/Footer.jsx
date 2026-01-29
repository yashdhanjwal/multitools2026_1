import { Mail, Phone, MapPin, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              Free Online Tools
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
              A comprehensive suite of free, browser-based tools for PDF management, image conversion, and utility tasks. No login required, privacy-focused, and 100% free.
            </p>
            <div className="flex space-x-4">
              {/* Social icons could go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">About Us</a></li>
              <li><a href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Terms of Use</a></li>
              <li><a href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary-600">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Yash Dhanjwal
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>info@yashdhanjwal.com</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>+91 87663 56943</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <MessageCircle className="w-4 h-4 text-primary-500" />
                <span>+91 99900 33043 (WhatsApp)</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-primary-500" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <Globe className="w-4 h-4 text-primary-500" />
                <a href="https://www.yashdhanjwal.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">yashdhanjwal.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Free Online Tools by Yash Dhanjwal (B. Tech Student). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
