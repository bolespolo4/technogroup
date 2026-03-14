import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import type { MediaData } from '../../services/mockData';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<MediaData[]>([]);

  useEffect(() => {
    api.getMedia('project').then((data) => {
      // Sort: international projects first (those with location)
      const sorted = [...data].sort((a, b) => {
        if (a.location && !b.location) return -1;
        if (!a.location && b.location) return 1;
        return 0;
      });
      setProjects(sorted.slice(0, 3));
    }).catch(console.error);
  }, []);

  if (!projects.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Case Studies</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Trusted by Global Projects
            </h2>
          </div>
          <Link
            to="/media"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-600 transition-colors"
          >
            Explore All Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/media`} className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${i === 0 ? '1486325212027-8081e485255e' : i === 1 ? '1504307651254-35680f356dfd' : '1565008447742-97f6f38c985c'}?w=600&q=80`}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.location && (
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                      <MapPin size={12} className="text-amber-400" />
                      <span className="text-white text-xs font-medium">{project.location}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      Waterproofing
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Calendar size={12} />
                      {new Date(project.date).getFullYear()}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-amber-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">{project.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
