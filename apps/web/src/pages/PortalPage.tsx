import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, Heart, Package } from 'lucide-react';

const savedProducts = [
  { id: '1', name: 'TechnoBoard Pro', family: 'Boards' },
  { id: '3', name: 'TechnoRoof Elite', family: 'Roofing' },
];

const downloads = [
  { name: 'TDS - TechnoBoard Pro', type: 'TDS', date: '2026-01-10' },
  { name: 'Installation Guide - TechnoRoof Elite', type: 'Guide', date: '2026-02-05' },
  { name: 'SDS - TechnoSeal Pro', type: 'SDS', date: '2026-03-01' },
];

export default function PortalPage() {
  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="container-main py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Professional Portal</h1>
          <p className="text-slate-600">Welcome back! Access your saved items and downloaded documents.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Downloads */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <Download size={20} className="text-amber-500" />
                <h2 className="font-bold text-slate-900 text-xl">Recent Downloads</h2>
              </div>
              <div className="space-y-4">
                {downloads.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                        <FileText size={16} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{doc.name}</p>
                        <p className="text-slate-500 text-xs">{doc.type} • {new Date(doc.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="text-amber-500 hover:text-amber-600 text-sm font-semibold">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Saved Products */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart size={18} className="text-amber-500" />
                <h2 className="font-bold text-slate-900">Saved Products</h2>
              </div>
              <div className="space-y-3">
                {savedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products`}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                  >
                    <Package size={16} className="text-slate-400 group-hover:text-amber-400" />
                    <div>
                      <p className="font-medium text-slate-900 text-sm group-hover:text-amber-600">{product.name}</p>
                      <p className="text-slate-400 text-xs">{product.family}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/products"
                className="mt-4 block text-center text-amber-500 hover:text-amber-600 text-sm font-semibold"
              >
                Browse More Products →
              </Link>
            </motion.div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Need Technical Support?</h3>
              <p className="text-slate-600 text-xs mb-4">Our experts can help with system selection and application.</p>
              <Link
                to="/request-support"
                className="block text-center bg-amber-400 text-slate-900 font-bold px-4 py-2.5 rounded-xl hover:bg-amber-500 transition-colors text-sm"
              >
                Request Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
