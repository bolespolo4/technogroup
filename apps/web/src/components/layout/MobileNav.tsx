import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Systems & Applications', href: '/systems' },
  { label: 'Products', href: '/products' },
  { label: 'Technical Hub', href: '/technical-hub' },
  { label: 'Markets & Partners', href: '/markets' },
  { label: 'Media Center', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    onClose();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-80 max-w-full bg-[#0f172a] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-white font-bold text-lg">TechnoBit</span>
              <button onClick={onClose} className="text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                          isActive
                            ? 'text-amber-400 bg-amber-400/10'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-6 border-t border-white/10 space-y-3">
              <Link
                to="/request-support"
                onClick={onClose}
                className="block w-full text-center bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors"
              >
                Request Technical Support
              </Link>
              <button
                onClick={toggleLanguage}
                className="block w-full text-center text-white/60 hover:text-white text-sm py-2"
              >
                {i18n.language === 'en' ? 'العربية' : 'English'} | {i18n.language === 'en' ? 'EN' : 'AR'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
