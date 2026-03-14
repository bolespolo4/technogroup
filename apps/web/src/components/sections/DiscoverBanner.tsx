import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Newspaper, Download, Film } from 'lucide-react';

const categories = [
  {
    icon: <BookOpen size={20} />,
    title: 'Systems',
    tags: ['Modified Bitumen', 'Liquid Waterproofing', 'Cement-Based'],
  },
  {
    icon: <Film size={20} />,
    title: 'Products',
    tags: ['Membranes', 'Primers', 'Tapes'],
  },
  {
    icon: <Download size={20} />,
    title: 'Technical Docs',
    tags: ['TDS', 'SDS', 'Installation Guides'],
  },
  {
    icon: <Newspaper size={20} />,
    title: 'Markets',
    tags: ['Middle East', 'Africa', 'Europe'],
  },
];

export default function DiscoverBanner() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/technical-hub?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-[#0a1628] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4"
        >
          Discover <span className="text-amber-400">TechnoBit</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 mb-10 text-lg"
        >
          Search products, systems, technical documentation, and markets
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Search systems, products, documents..."
                className="w-full bg-white/10 border border-white/20 focus:border-amber-400 rounded-2xl pl-14 pr-36 py-5 text-white placeholder:text-white/40 focus:outline-none transition-colors text-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-400 text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:bg-amber-500 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Dropdown */}
          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-20"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
                  {categories.map((cat) => (
                    <div key={cat.title} className="bg-slate-900 p-5">
                      <div className="flex items-center gap-2 text-amber-400 mb-3">
                        {cat.icon}
                        <span className="font-bold text-sm">{cat.title}</span>
                      </div>
                      <div className="space-y-2">
                        {cat.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setQuery(tag);
                              navigate(`/technical-hub?q=${encodeURIComponent(tag)}`);
                            }}
                            className="block text-left text-xs text-white/60 hover:text-white transition-colors"
                          >
                            → {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          <a href="/media" className="text-white/60 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
            <Newspaper size={14} /> Subscribe to News
          </a>
          <a href="/technical-hub" className="text-white/60 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
            <Download size={14} /> Download Literature
          </a>
          <a href="/media" className="text-white/60 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
            <Film size={14} /> Media Center
          </a>
        </motion.div>
      </div>
    </section>
  );
}
