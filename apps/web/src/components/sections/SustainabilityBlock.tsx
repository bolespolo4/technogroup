import { motion } from 'framer-motion';

const pillars = [
  {
    icon: '🌱',
    title: '70% Recycled Materials',
    desc: 'Our production process incorporates over 70% recycled and reclaimed materials, reducing landfill waste and conserving natural resources.',
  },
  {
    icon: '♻️',
    title: 'Zero Toxic Emissions',
    desc: 'All TechnoBit products are manufactured with zero volatile organic compound (VOC) emissions, ensuring safe indoor air quality.',
  },
  {
    icon: '♾️',
    title: 'Lifetime Durability',
    desc: 'Products engineered for 30+ year lifespans reduce replacement frequency, lowering the total environmental impact over time.',
  },
];

const stamps = [
  { name: 'ISO 14001', detail: 'Environmental Management System' },
  { name: 'LEED v4', detail: 'Green Building Credit Compliant' },
  { name: 'BREEAM', detail: 'Materials Category Approved' },
  { name: 'EPD', detail: 'Environmental Product Declaration' },
  { name: 'Cradle to Cradle', detail: 'Material Health Certified' },
  { name: 'Green Star', detail: 'Sustainable Product Rating' },
];

export default function SustainabilityBlock() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-alt, #f1f5f9)',
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-3">Our Commitment</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Sustainability &amp; Compliance
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Committed to Responsible Manufacturing Since 1934
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-5">{pillar.icon}</div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">{pillar.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Stamps */}
        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">
            Compliance &amp; Certification Standards
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stamps.map((stamp, i) => (
            <motion.div
              key={stamp.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center hover:border-green-400 transition-colors"
            >
              <div className="text-green-600 text-xl mb-2">✓</div>
              <p className="font-black text-slate-900 text-sm">{stamp.name}</p>
              <p className="text-slate-500 text-[10px] mt-1 leading-tight">{stamp.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
