import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import { api } from '../services/api';
import type { ProductData } from '../services/mockData';

const FILTER_OPTIONS = {
  family: ['Boards', 'Panels', 'Roofing', 'Flooring', 'Sealants', 'Insulation', 'Cladding', 'Decking', 'Acoustic', 'Fire Protection'],
  polymer: ['Cement', 'PUR', 'TPO', 'HPL', 'Silicone', 'Mineral Wool', 'WPC', 'PET', 'Calcium Silicate'],
  reinforcement: ['Fiber', 'Steel', 'Polyester', 'None', 'Glass Fiber', 'Resin', 'Wood Fiber', 'Recycled Fiber', 'Cellulose'],
  surface: ['Smooth', 'Textured', 'Membrane', 'Anti-static', 'Liquid', 'Foil-faced', 'Wood-grain', 'Brushed', 'Fabric-wrapped'],
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getProducts(filters);
      setProducts(result.items);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const clearFilters = () => {
    setFilters({});
    setSearch('');
    setPage(1);
  };

  const filtered = products.filter((p) => {
    if (!search) return true;
    return p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
  });

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="container-main py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Products</h1>
          <p className="text-slate-600">200+ waterproofing products engineered for every application.</p>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
            {(Object.keys(filters).length > 0 || search) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <X size={14} /> Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
              <div key={key}>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                  <Filter size={10} className="inline mr-1" />{key}
                </label>
                <select
                  value={filters[key] || ''}
                  onChange={(e) => {
                    setFilters((f) => {
                      const next = { ...f };
                      if (e.target.value) next[key] = e.target.value;
                      else delete next[key];
                      return next;
                    });
                    setPage(1);
                  }}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="">All</option>
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters} className="bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-colors">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-sm mb-4">Showing {paginated.length} of {filtered.length} products</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="group block bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="h-48 bg-slate-100 flex items-center justify-center">
                      <span className="text-5xl">🏗️</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{product.name}</h3>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">{product.family}</span>
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-2">{product.description}</p>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{product.polymer}</span>
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{product.surface}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
