import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    alert('Subscribed successfully!');
  };

  const navLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Systems & Applications', href: '/systems' },
    { label: 'Products', href: '/products' },
    { label: 'Technical Hub', href: '/technical-hub' },
    { label: 'Markets & Partners', href: '/markets' },
    { label: 'Media Center', href: '/media' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--color-primary, #1e40af)' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo + About + Social */}
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold tracking-tight">
                Techno<span className="text-amber-400">Bit</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Egypt's leading waterproofing manufacturer since 1934. Trusted in 52 countries worldwide with over 90 years of engineering excellence.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Nav Links + Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-amber-400 mb-6">Quick Links</h3>
            <ul className="space-y-2 mb-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Mail size={14} className="text-amber-400 flex-shrink-0" />
                <a href="mailto:sales@technogroup-egypt.com" className="hover:text-white transition-colors">
                  sales@technogroup-egypt.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Phone size={14} className="text-amber-400 flex-shrink-0" />
                <a href="tel:+201027714174" className="hover:text-white transition-colors">
                  +20 102 771 4174
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>60 Mahmasha St, Al-Shrabya, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <Clock size={14} className="text-amber-400 flex-shrink-0" />
                <span>Sun–Thu 9AM–6PM</span>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter + Factory */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-amber-400 mb-6">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4">Subscribe to our newsletter for product updates and industry news.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="bg-amber-400 text-slate-900 px-4 py-2.5 rounded-lg hover:bg-amber-500 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
            <div className="border-t border-white/10 pt-6">
              <h4 className="font-semibold text-sm mb-2">Factory Address</h4>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Zero/157A Kilo17, Misr/Bilbis Road, Al Sharqia, Egypt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© 2025 TechnoBit. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
