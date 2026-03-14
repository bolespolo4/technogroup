import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const systems = [
  {
    name: 'Modified Bitumen',
    desc: 'SBS & APP bituminous membranes for robust waterproofing',
    href: '/systems/modified-bitumen',
    bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    name: 'Synthetic Membranes',
    desc: 'TPO, PVC & EPDM membranes for long-term performance',
    href: '/systems/synthetic-membranes',
    bg: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
  },
  {
    name: 'Liquid Waterproofing',
    desc: 'Seamless liquid-applied systems for complex geometries',
    href: '/systems/liquid-waterproofing',
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
  {
    name: 'Cement-Based Systems',
    desc: 'Cementitious coatings for wet areas and foundations',
    href: '/systems/cement-based',
    bg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    name: 'Primers & Mastics',
    desc: 'Primers, fillets, and mastics for system compatibility',
    href: '/systems/primers-mastics',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name: 'Hot Applied Bitumen',
    desc: 'Oxidized bitumen systems for industrial applications',
    href: '/systems/hot-applied-bitumen',
    bg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    name: 'Specialty Tapes',
    desc: 'Self-adhesive tapes for joints, laps, and details',
    href: '/systems/specialty-tapes',
    bg: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80',
  },
];

export default function SystemsGrid() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Our Range</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Engineered Systems &amp; Products
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive waterproofing systems engineered for every application, climate, and substrate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, i) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={system.href} className="group block relative rounded-2xl overflow-hidden h-64">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${system.bg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {system.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">{system.desc}</p>
                  <span className="text-amber-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore System
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
