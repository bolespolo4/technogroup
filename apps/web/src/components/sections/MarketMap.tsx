import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CounterStat } from '../ui';
import { api } from '../../services/api';
import type { MarketData } from '../../services/mockData';

// Simplified SVG-based world map with country markers
const statusColors: Record<string, string> = {
  active: '#22c55e',
  partner: '#f59e0b',
  distributor: '#3b82f6',
  target: '#374151',
};

const statusLabels: Record<string, string> = {
  active: 'Active Market',
  partner: 'Agent / Partner',
  distributor: 'Distributor',
  target: 'Development',
};

// Convert lat/lng to SVG coordinates for a simple equirectangular projection
function toSVG(lat: number, lng: number): [number, number] {
  const W = 960;
  const H = 500;
  const x = ((lng + 180) / 360) * W;
  const y = ((90 - lat) / 180) * H;
  return [x, y];
}

interface TooltipState {
  market: MarketData;
  x: number;
  y: number;
}

export default function MarketMap() {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [partnerModal, setPartnerModal] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    api.getMarkets().then(setMarkets).catch(console.error);
  }, []);

  const handleMarkerEnter = (
    e: React.MouseEvent<SVGCircleElement>,
    market: MarketData,
  ) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        market,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section className="section-padding bg-slate-900">
      <div className="container-main">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">Global Reach</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            52+ Countries. One Standard of Excellence.
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From Egypt to the world — TechnoBit waterproofing systems protect structures across 5 continents.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10">
          <svg
            ref={svgRef}
            viewBox="0 0 960 500"
            className="w-full h-auto"
            style={{ background: 'transparent' }}
          >
            {/* Simple grid lines */}
            {[-60, -30, 0, 30, 60].map((lat) => {
              const [, y] = toSVG(lat, 0);
              return (
                <line
                  key={`lat-${lat}`}
                  x1={0}
                  y1={y}
                  x2={960}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              );
            })}
            {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lng) => {
              const [x] = toSVG(0, lng);
              return (
                <line
                  key={`lng-${lng}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={500}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Market Markers */}
            {markets.map((market) => {
              const [x, y] = toSVG(market.lat, market.lng);
              const color = statusColors[market.status] || '#374151';
              const isTarget = market.status === 'target';
              return (
                <circle
                  key={market.countryCode}
                  cx={x}
                  cy={y}
                  r={isTarget ? 5 : 8}
                  fill={color}
                  fillOpacity={isTarget ? 0.5 : 0.9}
                  stroke={isTarget ? 'transparent' : 'rgba(255,255,255,0.3)'}
                  strokeWidth={1}
                  className="cursor-pointer transition-all hover:r-10"
                  onMouseEnter={(e) => handleMarkerEnter(e, market)}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => {
                    if (isTarget) setPartnerModal(market.country);
                  }}
                />
              );
            })}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute pointer-events-none bg-slate-900 border border-white/20 rounded-xl p-3 shadow-xl z-10 text-sm min-w-[160px]"
              style={{
                left: Math.min(tooltip.x + 12, (svgRef.current?.clientWidth ?? 0) - 180),
                top: Math.max(tooltip.y - 60, 0),
              }}
            >
              <p className="font-bold text-white mb-1">{tooltip.market.country}</p>
              <p className="text-white/60 text-xs">{tooltip.market.region}</p>
              <span
                className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: statusColors[tooltip.market.status] + '30',
                  color: statusColors[tooltip.market.status],
                }}
              >
                {statusLabels[tooltip.market.status]}
              </span>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Legend</p>
            {Object.entries(statusLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: statusColors[key] }}
                />
                <span className="text-white/60 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 bg-slate-800/30 rounded-2xl p-8 border border-white/5">
          <CounterStat value={500} suffix="+" label="Projects Delivered" />
          <CounterStat value={200} suffix="+" label="Products" />
          <CounterStat value={90} suffix=" Yrs" label="Experience" />
          <CounterStat value={52} suffix="+" label="Countries" />
        </div>
      </div>

      {/* Partner Modal */}
      {partnerModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setPartnerModal(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-3">
              Become a Partner in {partnerModal}
            </h3>
            <p className="text-white/60 mb-6">
              We're expanding our distribution network. Get in touch to explore partnership opportunities in {partnerModal}.
            </p>
            <a
              href="/contact"
              className="block w-full text-center bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-amber-500 transition-colors"
              onClick={() => setPartnerModal(null)}
            >
              Contact Us →
            </a>
            <button
              onClick={() => setPartnerModal(null)}
              className="block w-full text-center text-white/50 hover:text-white mt-3 text-sm"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
