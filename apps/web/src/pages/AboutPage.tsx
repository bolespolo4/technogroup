import { motion } from 'framer-motion';
import { CounterStat } from '../components/ui';

const timeline = [
  { year: '1934', event: 'Founded in Cairo, Egypt as a bitumen manufacturer' },
  { year: '1960', event: 'Expanded to modified bitumen membranes production' },
  { year: '1985', event: 'First export to Gulf region markets' },
  { year: '2000', event: 'Launched in-house R&D and quality control laboratory' },
  { year: '2010', event: 'Achieved ISO 9001 and CE certification' },
  { year: '2024', event: 'Present in 52+ countries across 5 continents' },
];

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#1e40af] text-white py-24 px-4">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Since 1934</p>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-6">
              90 Years of Waterproofing Excellence
            </h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Egypt's leading waterproofing manufacturer, trusted by contractors, engineers, and developers across 52 countries.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-900 py-16">
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-8">
          <CounterStat value={90} suffix="+" label="Years Experience" />
          <CounterStat value={52} suffix="+" label="Countries" />
          <CounterStat value={500} suffix="+" label="Projects" />
          <CounterStat value={200} suffix="+" label="Products" />
        </div>
      </div>

      {/* Timeline */}
      <div className="container-main section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Journey</h2>
          <p className="text-slate-600">Nine decades of innovation and growth</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 -translate-x-1/2" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-0`}
              >
                <div className="md:w-1/2 md:px-12">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <p className="text-amber-500 font-black text-2xl mb-2">{item.year}</p>
                    <p className="text-slate-700">{item.event}</p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-amber-400 rounded-full border-4 border-white shadow -translate-x-1/2" />
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
