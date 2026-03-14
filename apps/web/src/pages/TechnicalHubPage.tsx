import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Download, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = ['Browse by System', 'Browse by Product', 'Search & Filter'] as const;
type Tab = typeof TABS[number];

const systems = [
  'Modified Bitumen', 'Synthetic Membranes', 'Liquid Waterproofing',
  'Cement-Based Systems', 'Primers & Mastics', 'Hot Applied Bitumen',
];

const docTypes = [
  { label: 'Technical Data Sheet', icon: '📋', count: 45 },
  { label: 'Safety Data Sheet', icon: '⚠️', count: 38 },
  { label: 'Installation Guide', icon: '📐', count: 22 },
  { label: 'Product Brochure', icon: '📄', count: 18 },
  { label: 'Test Certificate', icon: '🏆', count: 15 },
  { label: 'CAD Details', icon: '📏', count: 12 },
];

export default function TechnicalHubPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Browse by System');
  const [search, setSearch] = useState('');

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="container-main py-12">
        <div className="mb-10">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Technical Resources</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Technical Hub</h1>
          <p className="text-slate-600 max-w-2xl">
            Access TDS, SDS, installation guides, and CAD details. Register free to unlock full downloads.
          </p>
        </div>

        {/* Auth Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Lock size={24} className="text-amber-400 flex-shrink-0" />
            <div>
              <p className="font-bold">Full Access Available for Registered Professionals</p>
              <p className="text-white/70 text-sm">Register free to download TDS, SDS, and CAD details.</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/register" className="bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-amber-500 transition-colors text-sm">
              Register Free
            </Link>
            <Link to="/login" className="border border-white/30 text-white px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Log In
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
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

        {activeTab === 'Browse by System' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((sys, i) => (
              <motion.div
                key={sys}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-amber-400 hover:shadow-md transition-all"
              >
                <FileText size={24} className="text-amber-400 mb-3" />
                <h3 className="font-bold text-slate-900 mb-2">{sys}</h3>
                <p className="text-slate-500 text-sm mb-4">
                  {Math.floor(Math.random() * 10 + 5)} documents available
                </p>
                <button className="text-amber-500 hover:text-amber-600 font-semibold text-sm flex items-center gap-1">
                  <Lock size={12} /> View Documents
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'Browse by Product' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {docTypes.map((type, i) => (
              <motion.div
                key={type.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 p-5 text-center hover:border-amber-400 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <p className="font-bold text-slate-900 text-sm">{type.label}</p>
                <p className="text-slate-400 text-xs mt-1">{type.count} docs</p>
                <div className="mt-3 flex items-center justify-center gap-1 text-slate-400 text-xs">
                  <Lock size={10} />
                  <span>Login required</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'Search & Filter' && (
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
              <div className="relative mb-4">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search technical documents..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Application', 'Polymer', 'Document Type', 'System'].map((filter) => (
                  <div key={filter}>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">{filter}</label>
                    <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400">
                      <option>All</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <Download size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Search results will appear here</p>
              <p className="text-slate-400 text-sm mt-1">Use the filters above or enter a search term</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
