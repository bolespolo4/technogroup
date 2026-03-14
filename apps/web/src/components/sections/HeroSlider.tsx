import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    eyebrow: 'Since 1934',
    heading: 'Engineering Waterproofing at Industrial Scale',
    subtitle: 'Manufactured in Egypt. Trusted in 52 Countries.',
    bg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
  },
  {
    id: 2,
    eyebrow: 'Complete Systems',
    heading: 'Complete Systems. Every Application.',
    subtitle: 'From rooftop to foundation.',
    bg: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
  },
  {
    id: 3,
    eyebrow: 'Quality Control',
    heading: 'Quality Tested at Every Layer',
    subtitle: 'In-house R&D lab. International certifications since 1934.',
    bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
  },
  {
    id: 4,
    eyebrow: 'New Products',
    heading: 'Innovation Built to Last a Lifetime',
    subtitle: 'New product lines meeting global standards.',
    bg: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const duration = 6000;

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
    }, 50);

    const slideTimer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [current]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, i) =>
          i === current ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.bg})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(10,22,40,0.85) 40%, rgba(10,22,40,0.3) 100%)',
                }}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl"
            >
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">
                {slides[current].eyebrow}
              </p>
              <h1
                className="text-5xl md:text-7xl font-black text-white uppercase leading-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {slides[current].heading}
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-light max-w-xl">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Progress Bar */}
        <div className="h-0.5 bg-white/20">
          <motion.div
            className="h-full bg-amber-400"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <span className="text-white/60 text-sm font-mono">
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/30 text-white/70 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/30 text-white/70 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
