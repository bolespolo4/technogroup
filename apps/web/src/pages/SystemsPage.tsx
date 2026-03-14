import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import type { SystemData } from '../services/mockData';

export default function SystemsPage() {
  const [systems, setSystems] = useState<SystemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSystems().then(setSystems).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="container-main py-12">
        <div className="mb-10">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">What We Offer</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Systems & Applications</h1>
          <p className="text-slate-600 max-w-2xl">
            Complete waterproofing systems for every application — from rooftop to foundation.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system, i) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/systems/${system.slug}`}
                  className="group block bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all overflow-hidden"
                >
                  <div
                    className="h-48 flex items-center justify-center text-6xl"
                    style={{ backgroundColor: system.color + '15' }}
                  >
                    {system.icon}
                  </div>
                  <div className="p-6">
                    <h2 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-amber-600 transition-colors">
                      {system.name}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{system.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{system.productCount} products</span>
                      <span className="text-amber-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
