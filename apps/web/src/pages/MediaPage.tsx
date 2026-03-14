import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Play } from 'lucide-react';
import { api } from '../services/api';
import type { MediaData } from '../services/mockData';

const TABS = [
  { key: '', label: 'All' },
  { key: 'news', label: 'News & Articles' },
  { key: 'project', label: 'Projects' },
  { key: 'event', label: 'Exhibitions' },
  { key: 'award', label: 'Awards' },
  { key: 'video', label: 'Videos' },
] as const;

type TabKey = typeof TABS[number]['key'];

const typeIcons: Record<string, React.ReactNode> = {
  news: '📰',
  project: '🏗️',
  event: '🎪',
  award: <Award size={16} />,
  video: <Play size={16} />,
};

export default function MediaPage() {
  const [media, setMedia] = useState<MediaData[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getMedia(activeTab || undefined)
      .then(setMedia)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="container-main py-12">
        <div className="mb-10">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Latest Updates</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Media Center</h1>
          <p className="text-slate-600 max-w-2xl">
            News, project case studies, exhibition highlights, awards, and videos from TechnoBit.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-amber-400 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-slate-600">No content in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl">
                    {typeof typeIcons[item.type] === 'string' ? typeIcons[item.type] : '📄'}
                  </span>
                  {item.featured && (
                    <div className="absolute top-3 left-3 bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-full capitalize">
                    {item.type}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={11} />
                        {item.location}
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2">{item.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
