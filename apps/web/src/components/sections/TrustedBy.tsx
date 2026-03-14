import { motion } from 'framer-motion';

const companies = [
  'Orascom Construction', 'EMAAR Properties', 'Arabtec', 'Al-Qudra Holding',
  'Saudi Binladin Group', 'Consolidated Contractors', 'Drake & Scull',
  'Shapoorji Pallonji', 'ALEC Engineering', 'Six Construct',
];

const certifications = [
  { name: 'ISO 9001:2015', sub: 'Quality Management' },
  { name: 'ISO 14001:2015', sub: 'Environmental Mgmt' },
  { name: 'CE Marking', sub: 'European Conformity' },
  { name: 'FM Approved', sub: 'Factory Mutual Global' },
  { name: 'ASTM D6163', sub: 'Standard Specification' },
  { name: 'EN 13707', sub: 'Bituminous Sheets' },
  { name: 'EOS Certified', sub: 'Egyptian Standards' },
  { name: 'LEED Compliant', sub: 'Green Building' },
];

export default function TrustedBy() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Partners</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Leading Companies Worldwide
          </h2>
        </div>

        {/* Infinite Marquee */}
        <div className="relative overflow-hidden mb-16">
          <div className="flex gap-4 group">
            <motion.div
              className="flex gap-4 flex-shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ willChange: 'transform' }}
            >
              {[...companies, ...companies].map((company, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white border border-slate-200 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:border-amber-300 transition-all"
                  style={{ minWidth: '200px' }}
                >
                  <p className="text-slate-700 font-semibold text-sm text-center whitespace-nowrap">{company}</p>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
        </div>

        {/* Certifications */}
        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">International Certifications & Standards</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-amber-400 transition-colors"
            >
              <p className="font-bold text-slate-900 text-sm">{cert.name}</p>
              <p className="text-slate-500 text-xs mt-1">{cert.sub}</p>
              <div className="mt-2 text-[10px] text-green-600 font-semibold uppercase tracking-wider">✓ Certified</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
