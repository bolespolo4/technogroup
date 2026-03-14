import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import type { SystemData } from '../services/mockData';

export default function SystemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [system, setSystem] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.getSystem(slug).then(setSystem).catch(console.error).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading system…</div>
      </div>
    );
  }

  if (!system) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">System not found</h2>
          <Link to="/systems" className="text-amber-500 hover:text-amber-600 font-semibold">
            ← Back to Systems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div
        className="py-20 px-4"
        style={{ background: `linear-gradient(135deg, ${system.color}22 0%, ${system.color}08 100%)` }}
      >
        <div className="container-main">
          <Link to="/systems" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 text-sm">
            <ArrowLeft size={14} /> All Systems
          </Link>
          <div className="flex items-start gap-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: system.color + '20' }}
            >
              {system.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3">{system.name}</h1>
              <p className="text-slate-600 text-lg max-w-2xl">{system.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* System Diagram Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-100 rounded-2xl h-64 flex flex-col items-center justify-center mb-10 border-2 border-dashed border-slate-300"
            >
              <span className="text-5xl mb-3">{system.icon}</span>
              <p className="text-slate-400 font-medium">System Diagram</p>
              <p className="text-slate-400 text-sm">Technical diagram coming soon</p>
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {system.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <span className="text-amber-400 text-lg">✓</span>
                  <span className="text-slate-700 font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Gated Docs */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <Lock size={24} className="text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-xl mb-2">Technical Documentation</h3>
                  <p className="text-white/70 mb-4">
                    System specifications, application guides, and CAD details are available for registered professionals.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      to="/register"
                      className="bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-colors text-sm"
                    >
                      Register Free
                    </Link>
                    <Link
                      to="/login"
                      className="border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4">Need Technical Support?</h3>
              <p className="text-slate-600 text-sm mb-4">
                Our technical team can help you specify the right system for your project.
              </p>
              <Link
                to={`/request-support?system=${slug}`}
                className="block text-center bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-colors text-sm"
              >
                Request Support for This System
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Related Products</h3>
              <div className="space-y-3">
                <Link
                  to="/products"
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group"
                >
                  <span className="text-sm text-slate-700 group-hover:text-amber-600">Browse {system.productCount} products</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
