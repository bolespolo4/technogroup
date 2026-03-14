import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MobileNav from './MobileNav';

const systemLinks = [
  { label: 'Modified Bitumen', href: '/systems/modified-bitumen' },
  { label: 'Synthetic Membranes', href: '/systems/synthetic-membranes' },
  { label: 'Liquid Waterproofing', href: '/systems/liquid-waterproofing' },
  { label: 'Cement-Based Systems', href: '/systems/cement-based' },
  { label: 'Primers & Mastics', href: '/systems/primers-mastics' },
  { label: 'Hot Applied Bitumen', href: '/systems/hot-applied-bitumen' },
];

const productLinks = [
  { label: 'Modified Bitumen Membranes', href: '/products?family=modified-bitumen' },
  { label: 'APP & SBS Membranes', href: '/products?family=app-sbs' },
  { label: 'Liquid Waterproofing', href: '/products?family=liquid' },
  { label: 'Cement-Based Products', href: '/products?family=cement-based' },
  { label: 'Bituminous Primers', href: '/products?family=primers' },
  { label: 'Specialty Tapes', href: '/products?family=tapes' },
  { label: 'Accessories', href: '/products?family=accessories' },
];

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Systems & Applications', href: '/systems', megaKey: 'systems' },
  { label: 'Products', href: '/products', megaKey: 'products' },
  { label: 'Technical Hub', href: '/technical-hub' },
  { label: 'Markets & Partners', href: '/markets' },
  { label: 'Media Center', href: '/media' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveMega(null);
  }, [location.pathname]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1e40af]/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold tracking-tight text-white">
                Techno<span className="text-amber-400">Bit</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setActiveMega(null)}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + '/');
                const hasMega = !!link.megaKey;
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setActiveMega(hasMega ? link.megaKey! : null)}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors relative group ${
                        isActive ? 'text-amber-400' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {hasMega && <ChevronDown size={14} className={`transition-transform ${activeMega === link.megaKey ? 'rotate-180' : ''}`} />}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full"
                        />
                      )}
                    </Link>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {hasMega && activeMega === link.megaKey && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 bg-slate-900 rounded-xl shadow-2xl border border-white/10 p-4 min-w-[220px]"
                        >
                          <ul className="space-y-1">
                            {(link.megaKey === 'systems' ? systemLinks : productLinks).map((item) => (
                              <li key={item.href}>
                                <Link
                                  to={item.href}
                                  className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right: Language + CTA + Mobile */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="hidden lg:block text-white/70 hover:text-white text-sm font-medium px-2 py-1 border border-white/20 rounded-lg transition-colors"
              >
                {i18n.language === 'en' ? 'AR' : 'EN'}
              </button>
              <Link
                to="/request-support"
                className="hidden lg:block bg-amber-400 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-500 transition-colors"
              >
                Request Technical Support
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white p-2"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
