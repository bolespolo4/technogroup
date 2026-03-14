import { motion } from 'framer-motion';
import MarketMap from '../components/sections/MarketMap';
import { Link } from 'react-router-dom';

export default function MarketsPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container-main py-12">
        <div className="mb-10 text-center">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Global Presence</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Markets & Partners</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            TechnoBit waterproofing solutions protect structures across 52+ countries. Join our growing global network.
          </p>
        </div>
      </div>

      <MarketMap />

      <div className="bg-amber-50 border-t border-amber-100">
        <div className="container-main py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Become a Distributor</h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              Partner with Egypt's leading waterproofing manufacturer. We're actively expanding into new markets.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-500 transition-colors"
            >
              Contact Our Export Team
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
