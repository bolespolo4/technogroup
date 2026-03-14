import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Lock, ArrowLeft, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import type { ProductData } from '../services/mockData';

const TABS = ['Overview', 'Technical Specs', 'Application Method', 'Documents', 'Compatible Systems'] as const;
type Tab = typeof TABS[number];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getProduct(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-lg">Loading product…</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-amber-500 hover:text-amber-600 font-semibold">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-main py-4 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-slate-900">Products</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <div className="container-main py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 text-sm">
          <ArrowLeft size={14} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-100 rounded-2xl h-80 flex items-center justify-center"
          >
            <span className="text-8xl">🏗️</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase mb-3 inline-block">
              {product.family}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">{product.description}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {product.applications.slice(0, 4).map((app) => (
                <span key={app} className="bg-slate-100 text-slate-700 text-sm px-3 py-1.5 rounded-lg">
                  {app}
                </span>
              ))}
            </div>
            <Link
              to="/request-support"
              className="inline-block bg-amber-400 text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-500 transition-colors"
            >
              Request Technical Support
            </Link>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-amber-400 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Product Overview</h3>
            <p className="text-slate-600">{product.description}</p>
            <h4 className="font-bold text-slate-900 mt-6 mb-3">Applications</h4>
            <ul className="space-y-2">
              {product.applications.map((app) => (
                <li key={app} className="flex items-center gap-2 text-slate-600">
                  <span className="text-amber-400">✓</span> {app}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'Technical Specs' && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Technical Specifications</h3>
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <span className="font-medium text-slate-700 text-sm">{key}</span>
                  <span className="text-slate-900 font-bold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Application Method' && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Application Method</h3>
            <div className="space-y-4">
              {['Surface Preparation', 'Primer Application', 'Product Installation', 'Finishing & Inspection'].map((step, i) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{step}</h4>
                    <p className="text-slate-600 text-sm">Follow manufacturer guidelines for {step.toLowerCase()}. Consult the technical data sheet for product-specific requirements.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Documents' && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Technical Documents</h3>
            <div className="space-y-3">
              {product.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Download size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{doc.name}</p>
                      <p className="text-slate-500 text-xs uppercase">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Lock size={14} />
                    <Link
                      to="/login"
                      className="text-amber-500 hover:text-amber-600 font-semibold text-sm"
                    >
                      Register to Download
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Compatible Systems' && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Compatible Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.systems.map((sys) => (
                <Link
                  key={sys}
                  to={`/systems/${sys}`}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all"
                >
                  <span className="font-medium text-slate-900 capitalize">{sys.replace(/-/g, ' ')}</span>
                  <ChevronRight size={16} className="text-amber-400" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
