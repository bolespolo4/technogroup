export interface ProductData {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  family: string;
  polymer: string;
  reinforcement: string;
  surface: string;
  systems: string[];
  specifications: Record<string, string>;
  applications: string[];
  documents: Array<{ name: string; url: string; type: string }>;
}

export interface SystemData {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  features: string[];
  productCount: number;
}

export interface MarketData {
  country: string;
  countryCode: string;
  region: string;
  status: 'active' | 'partner' | 'distributor' | 'target';
  lat: number;
  lng: number;
}

export interface MediaData {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  type: 'news' | 'event' | 'project' | 'award' | 'video';
  location?: string;
  date: string;
  featured: boolean;
}

export const mockProducts: ProductData[] = [
  {
    id: '1', slug: 'technoboard-pro', name: 'TechnoBoard Pro', description: 'High-performance fiber cement board for exterior cladding and facades. Engineered for durability and weather resistance in demanding environments.',
    image: '/images/products/technoboard-pro.jpg', family: 'Boards', polymer: 'Cement', reinforcement: 'Fiber', surface: 'Smooth',
    systems: ['facade-systems', 'wall-systems'], specifications: { 'Thickness': '8-12mm', 'Density': '1.65 g/cm³', 'Fire Rating': 'A2-s1,d0', 'Flexural Strength': '≥24 MPa' },
    applications: ['Exterior cladding', 'Ventilated facades', 'Balcony soffits', 'Partition walls'],
    documents: [{ name: 'TDS - TechnoBoard Pro', url: '#', type: 'tds' }, { name: 'SDS - TechnoBoard Pro', url: '#', type: 'sds' }],
  },
  {
    id: '2', slug: 'technowall-x', name: 'TechnoWall X', description: 'Advanced wall panel system with superior thermal insulation properties and rapid installation capabilities.',
    image: '/images/products/technowall-x.jpg', family: 'Panels', polymer: 'PUR', reinforcement: 'Steel', surface: 'Textured',
    systems: ['wall-systems', 'insulation-systems'], specifications: { 'Thickness': '50-200mm', 'U-Value': '0.22 W/m²K', 'Fire Rating': 'B-s2,d0', 'Sound Reduction': '≥32 dB' },
    applications: ['Interior partitions', 'External walls', 'Cold storage', 'Clean rooms'],
    documents: [{ name: 'TDS - TechnoWall X', url: '#', type: 'tds' }],
  },
  {
    id: '3', slug: 'technoroof-elite', name: 'TechnoRoof Elite', description: 'Premium roofing solution with integrated waterproofing membrane. Designed for flat and low-slope roof applications.',
    image: '/images/products/technoroof-elite.jpg', family: 'Roofing', polymer: 'TPO', reinforcement: 'Polyester', surface: 'Membrane',
    systems: ['roofing-systems'], specifications: { 'Thickness': '1.5-2.0mm', 'Tensile Strength': '≥15 MPa', 'Elongation': '≥400%', 'UV Resistance': 'Excellent' },
    applications: ['Flat roofs', 'Green roofs', 'Parking decks', 'Industrial roofing'],
    documents: [{ name: 'TDS - TechnoRoof Elite', url: '#', type: 'tds' }, { name: 'Installation Guide', url: '#', type: 'guide' }],
  },
  {
    id: '4', slug: 'technofloor-hd', name: 'TechnoFloor HD', description: 'Heavy-duty raised access floor system for commercial and data center applications with excellent load-bearing capacity.',
    image: '/images/products/technofloor-hd.jpg', family: 'Flooring', polymer: 'HPL', reinforcement: 'Steel', surface: 'Anti-static',
    systems: ['flooring-systems'], specifications: { 'Panel Size': '600x600mm', 'Load Class': 'Class 6', 'Fire Rating': 'A2fl-s1', 'Height Range': '50-1200mm' },
    applications: ['Data centers', 'Office spaces', 'Server rooms', 'Control rooms'],
    documents: [{ name: 'TDS - TechnoFloor HD', url: '#', type: 'tds' }],
  },
  {
    id: '5', slug: 'technoseal-pro', name: 'TechnoSeal Pro', description: 'Professional-grade sealant and waterproofing system for joints, connections, and critical building interfaces.',
    image: '/images/products/technoseal-pro.jpg', family: 'Sealants', polymer: 'Silicone', reinforcement: 'None', surface: 'Liquid',
    systems: ['waterproofing-systems'], specifications: { 'Cure Time': '24-48h', 'Elongation': '≥600%', 'Temperature Range': '-40°C to +150°C', 'UV Stability': '20+ years' },
    applications: ['Facade joints', 'Expansion joints', 'Wet areas', 'Below-grade waterproofing'],
    documents: [{ name: 'TDS - TechnoSeal Pro', url: '#', type: 'tds' }, { name: 'Application Guide', url: '#', type: 'guide' }],
  },
  {
    id: '6', slug: 'technoinsulate-max', name: 'TechnoInsulate Max', description: 'Maximum performance thermal insulation board with exceptional fire resistance and minimal thermal bridging.',
    image: '/images/products/technoinsulate-max.jpg', family: 'Insulation', polymer: 'Mineral Wool', reinforcement: 'Glass Fiber', surface: 'Foil-faced',
    systems: ['insulation-systems', 'facade-systems'], specifications: { 'Thickness': '40-200mm', 'Lambda': '0.032 W/mK', 'Fire Rating': 'A1', 'Compressive Strength': '≥70 kPa' },
    applications: ['ETICS systems', 'Cavity walls', 'Flat roofs', 'Industrial insulation'],
    documents: [{ name: 'TDS - TechnoInsulate Max', url: '#', type: 'tds' }],
  },
  {
    id: '7', slug: 'technocladding-v', name: 'TechnoCladding V', description: 'Ventilated facade cladding panel with superior aesthetics and weather protection for modern architectural designs.',
    image: '/images/products/technocladding-v.jpg', family: 'Cladding', polymer: 'HPL', reinforcement: 'Resin', surface: 'Wood-grain',
    systems: ['facade-systems'], specifications: { 'Thickness': '6-13mm', 'Impact Resistance': 'IK10', 'Color Fastness': 'Grade 5', 'Warranty': '15 years' },
    applications: ['Ventilated facades', 'Balcony cladding', 'Sun screens', 'Feature walls'],
    documents: [{ name: 'TDS - TechnoCladding V', url: '#', type: 'tds' }, { name: 'Color Chart', url: '#', type: 'brochure' }],
  },
  {
    id: '8', slug: 'technodeck-composite', name: 'TechnoDeck Composite', description: 'Composite decking solution combining natural aesthetics with zero-maintenance performance for outdoor living spaces.',
    image: '/images/products/technodeck-composite.jpg', family: 'Decking', polymer: 'WPC', reinforcement: 'Wood Fiber', surface: 'Brushed',
    systems: ['flooring-systems'], specifications: { 'Width': '145mm', 'Thickness': '25mm', 'Slip Rating': 'R11', 'Warranty': '25 years' },
    applications: ['Terraces', 'Pool decks', 'Boardwalks', 'Roof terraces'],
    documents: [{ name: 'TDS - TechnoDeck', url: '#', type: 'tds' }],
  },
  {
    id: '9', slug: 'technoacoustic-panel', name: 'TechnoAcoustic Panel', description: 'High-performance acoustic panel for noise control in commercial, educational, and healthcare environments.',
    image: '/images/products/technoacoustic-panel.jpg', family: 'Acoustic', polymer: 'PET', reinforcement: 'Recycled Fiber', surface: 'Fabric-wrapped',
    systems: ['wall-systems'], specifications: { 'NRC Rating': '0.85-1.00', 'Thickness': '25-50mm', 'Fire Rating': 'B-s1,d0', 'Recycled Content': '≥65%' },
    applications: ['Offices', 'Auditoriums', 'Classrooms', 'Healthcare facilities'],
    documents: [{ name: 'TDS - TechnoAcoustic', url: '#', type: 'tds' }],
  },
  {
    id: '10', slug: 'technofire-shield', name: 'TechnoFire Shield', description: 'Advanced fire-resistant board providing up to 4 hours of fire protection for structural steel and building elements.',
    image: '/images/products/technofire-shield.jpg', family: 'Fire Protection', polymer: 'Calcium Silicate', reinforcement: 'Cellulose', surface: 'Smooth',
    systems: ['wall-systems', 'insulation-systems'], specifications: { 'Fire Rating': 'Up to 4 hours', 'Density': '870 kg/m³', 'Thickness': '6-25mm', 'Asbestos': 'Free' },
    applications: ['Structural fire protection', 'Fire walls', 'Duct enclosures', 'Steel protection'],
    documents: [{ name: 'TDS - TechnoFire Shield', url: '#', type: 'tds' }, { name: 'Fire Test Report', url: '#', type: 'certificate' }],
  },
];

export const mockSystems: SystemData[] = [
  { id: '1', slug: 'facade-systems', name: 'Facade Systems', description: 'Complete ventilated and non-ventilated facade solutions for modern buildings. Our facade systems combine aesthetics with performance.', image: '/images/systems/facade.jpg', icon: '🏢', color: '#1e40af', features: ['Ventilated facades', 'Rainscreen cladding', 'ETICS systems', 'Decorative panels'], productCount: 3 },
  { id: '2', slug: 'roofing-systems', name: 'Roofing Systems', description: 'High-performance roofing solutions for flat, pitched, and green roof applications with integrated waterproofing.', image: '/images/systems/roofing.jpg', icon: '🏠', color: '#059669', features: ['Flat roofing', 'Green roofs', 'Metal roofing', 'Waterproofing membranes'], productCount: 2 },
  { id: '3', slug: 'wall-systems', name: 'Wall Systems', description: 'Interior and exterior wall solutions including partitions, fire-rated assemblies, and acoustic treatments.', image: '/images/systems/wall.jpg', icon: '🧱', color: '#d97706', features: ['Drywall partitions', 'Fire-rated walls', 'Acoustic solutions', 'Shaftwall systems'], productCount: 4 },
  { id: '4', slug: 'flooring-systems', name: 'Flooring Systems', description: 'Raised access floors, composite decking, and specialty flooring for commercial and industrial applications.', image: '/images/systems/flooring.jpg', icon: '⬛', color: '#7c3aed', features: ['Raised access floors', 'Composite decking', 'Industrial flooring', 'Anti-static floors'], productCount: 2 },
  { id: '5', slug: 'insulation-systems', name: 'Insulation Systems', description: 'Thermal and acoustic insulation solutions meeting the highest energy efficiency and fire safety standards.', image: '/images/systems/insulation.jpg', icon: '🔥', color: '#dc2626', features: ['Thermal insulation', 'Acoustic insulation', 'Fire protection', 'Pipe insulation'], productCount: 3 },
  { id: '6', slug: 'waterproofing-systems', name: 'Waterproofing Systems', description: 'Complete waterproofing and sealing solutions for below-grade, wet areas, and building envelope applications.', image: '/images/systems/waterproofing.jpg', icon: '💧', color: '#0891b2', features: ['Below-grade waterproofing', 'Wet area systems', 'Joint sealants', 'Liquid membranes'], productCount: 1 },
];

export const mockMarkets: MarketData[] = [
  { country: 'Saudi Arabia', countryCode: 'SA', region: 'Middle East', status: 'active', lat: 23.8859, lng: 45.0792 },
  { country: 'United Arab Emirates', countryCode: 'AE', region: 'Middle East', status: 'active', lat: 23.4241, lng: 53.8478 },
  { country: 'Qatar', countryCode: 'QA', region: 'Middle East', status: 'active', lat: 25.3548, lng: 51.1839 },
  { country: 'Kuwait', countryCode: 'KW', region: 'Middle East', status: 'active', lat: 29.3117, lng: 47.4818 },
  { country: 'Bahrain', countryCode: 'BH', region: 'Middle East', status: 'active', lat: 26.0667, lng: 50.5577 },
  { country: 'Oman', countryCode: 'OM', region: 'Middle East', status: 'active', lat: 21.4735, lng: 55.9754 },
  { country: 'Egypt', countryCode: 'EG', region: 'North Africa', status: 'active', lat: 26.8206, lng: 30.8025 },
  { country: 'Jordan', countryCode: 'JO', region: 'Middle East', status: 'partner', lat: 30.5852, lng: 36.2384 },
  { country: 'Iraq', countryCode: 'IQ', region: 'Middle East', status: 'partner', lat: 33.2232, lng: 43.6793 },
  { country: 'Lebanon', countryCode: 'LB', region: 'Middle East', status: 'partner', lat: 33.8547, lng: 35.8623 },
  { country: 'Turkey', countryCode: 'TR', region: 'Europe', status: 'distributor', lat: 38.9637, lng: 35.2433 },
  { country: 'Germany', countryCode: 'DE', region: 'Europe', status: 'distributor', lat: 51.1657, lng: 10.4515 },
  { country: 'United Kingdom', countryCode: 'GB', region: 'Europe', status: 'distributor', lat: 55.3781, lng: -3.4360 },
  { country: 'France', countryCode: 'FR', region: 'Europe', status: 'distributor', lat: 46.2276, lng: 2.2137 },
  { country: 'Italy', countryCode: 'IT', region: 'Europe', status: 'distributor', lat: 41.8719, lng: 12.5674 },
  { country: 'Spain', countryCode: 'ES', region: 'Europe', status: 'partner', lat: 40.4637, lng: -3.7492 },
  { country: 'India', countryCode: 'IN', region: 'South Asia', status: 'partner', lat: 20.5937, lng: 78.9629 },
  { country: 'Pakistan', countryCode: 'PK', region: 'South Asia', status: 'partner', lat: 30.3753, lng: 69.3451 },
  { country: 'Nigeria', countryCode: 'NG', region: 'West Africa', status: 'target', lat: 9.0820, lng: 8.6753 },
  { country: 'South Africa', countryCode: 'ZA', region: 'Southern Africa', status: 'target', lat: -30.5595, lng: 22.9375 },
  { country: 'Kenya', countryCode: 'KE', region: 'East Africa', status: 'target', lat: -0.0236, lng: 37.9062 },
  { country: 'Morocco', countryCode: 'MA', region: 'North Africa', status: 'partner', lat: 31.7917, lng: -7.0926 },
  { country: 'Tunisia', countryCode: 'TN', region: 'North Africa', status: 'partner', lat: 33.8869, lng: 9.5375 },
  { country: 'Algeria', countryCode: 'DZ', region: 'North Africa', status: 'target', lat: 28.0339, lng: 1.6596 },
  { country: 'Libya', countryCode: 'LY', region: 'North Africa', status: 'target', lat: 26.3351, lng: 17.2283 },
  { country: 'Sudan', countryCode: 'SD', region: 'East Africa', status: 'target', lat: 12.8628, lng: 30.2176 },
  { country: 'Ethiopia', countryCode: 'ET', region: 'East Africa', status: 'target', lat: 9.1450, lng: 40.4897 },
  { country: 'Tanzania', countryCode: 'TZ', region: 'East Africa', status: 'target', lat: -6.3690, lng: 34.8888 },
  { country: 'Ghana', countryCode: 'GH', region: 'West Africa', status: 'target', lat: 7.9465, lng: -1.0232 },
  { country: 'Senegal', countryCode: 'SN', region: 'West Africa', status: 'target', lat: 14.4974, lng: -14.4524 },
  { country: 'Uzbekistan', countryCode: 'UZ', region: 'Central Asia', status: 'target', lat: 41.3775, lng: 64.5853 },
  { country: 'Kazakhstan', countryCode: 'KZ', region: 'Central Asia', status: 'target', lat: 48.0196, lng: 66.9237 },
  { country: 'Azerbaijan', countryCode: 'AZ', region: 'Caucasus', status: 'partner', lat: 40.1431, lng: 47.5769 },
  { country: 'Georgia', countryCode: 'GE', region: 'Caucasus', status: 'target', lat: 42.3154, lng: 43.3569 },
  { country: 'Malaysia', countryCode: 'MY', region: 'Southeast Asia', status: 'partner', lat: 4.2105, lng: 101.9758 },
  { country: 'Indonesia', countryCode: 'ID', region: 'Southeast Asia', status: 'target', lat: -0.7893, lng: 113.9213 },
  { country: 'Vietnam', countryCode: 'VN', region: 'Southeast Asia', status: 'target', lat: 14.0583, lng: 108.2772 },
  { country: 'Philippines', countryCode: 'PH', region: 'Southeast Asia', status: 'target', lat: 12.8797, lng: 121.7740 },
  { country: 'Thailand', countryCode: 'TH', region: 'Southeast Asia', status: 'target', lat: 15.8700, lng: 100.9925 },
  { country: 'Bangladesh', countryCode: 'BD', region: 'South Asia', status: 'target', lat: 23.6850, lng: 90.3563 },
  { country: 'Sri Lanka', countryCode: 'LK', region: 'South Asia', status: 'target', lat: 7.8731, lng: 80.7718 },
  { country: 'Poland', countryCode: 'PL', region: 'Europe', status: 'distributor', lat: 51.9194, lng: 19.1451 },
  { country: 'Romania', countryCode: 'RO', region: 'Europe', status: 'target', lat: 45.9432, lng: 24.9668 },
  { country: 'Greece', countryCode: 'GR', region: 'Europe', status: 'target', lat: 39.0742, lng: 21.8243 },
  { country: 'Cyprus', countryCode: 'CY', region: 'Europe', status: 'partner', lat: 35.1264, lng: 33.4299 },
  { country: 'Australia', countryCode: 'AU', region: 'Oceania', status: 'target', lat: -25.2744, lng: 133.7751 },
  { country: 'Brazil', countryCode: 'BR', region: 'South America', status: 'target', lat: -14.2350, lng: -51.9253 },
  { country: 'Mexico', countryCode: 'MX', region: 'North America', status: 'target', lat: 23.6345, lng: -102.5528 },
  { country: 'Colombia', countryCode: 'CO', region: 'South America', status: 'target', lat: 4.5709, lng: -74.2973 },
  { country: 'Chile', countryCode: 'CL', region: 'South America', status: 'target', lat: -35.6751, lng: -71.5430 },
  { country: 'Peru', countryCode: 'PE', region: 'South America', status: 'target', lat: -9.1900, lng: -75.0152 },
  { country: 'Argentina', countryCode: 'AR', region: 'South America', status: 'target', lat: -38.4161, lng: -63.6167 },
];

export const mockMedia: MediaData[] = [
  { id: '1', slug: 'dubai-mega-tower', title: 'TechnoBit Solutions Featured in Dubai Mega Tower Project', content: 'TechnoBit facade systems were selected for the prestigious Dubai Mega Tower...', excerpt: 'Our facade systems were chosen for one of the tallest buildings in the Middle East.', image: '/images/media/dubai-tower.jpg', type: 'project', location: 'Dubai, UAE', date: '2026-01-15', featured: true },
  { id: '2', slug: 'big5-dubai-2026', title: 'TechnoBit at The Big 5 Dubai 2026', content: 'Visit us at The Big 5 construction exhibition in Dubai...', excerpt: 'Join us at the leading construction exhibition in the Middle East.', image: '/images/media/big5.jpg', type: 'event', location: 'Dubai World Trade Centre', date: '2026-03-05', featured: true },
  { id: '3', slug: 'sustainability-award-2025', title: 'TechnoBit Wins Green Building Award 2025', content: 'TechnoBit has been recognized for its commitment to sustainable construction...', excerpt: 'Recognized for excellence in sustainable building materials.', image: '/images/media/award.jpg', type: 'award', date: '2025-12-01', featured: true },
  { id: '4', slug: 'new-roofing-line', title: 'Introducing the New TechnoRoof Elite Series', content: 'TechnoBit launches the next generation of roofing solutions...', excerpt: 'Next-gen roofing with improved thermal performance and sustainability.', image: '/images/media/new-roof.jpg', type: 'news', date: '2026-02-20', featured: false },
  { id: '5', slug: 'riyadh-metro-project', title: 'TechnoBit in Riyadh Metro Expansion', content: 'Our insulation systems are being installed across multiple Riyadh Metro stations...', excerpt: 'Supplying insulation for one of the largest metro projects in the world.', image: '/images/media/riyadh-metro.jpg', type: 'project', location: 'Riyadh, KSA', date: '2026-02-10', featured: true },
  { id: '6', slug: 'installation-best-practices', title: 'Facade Installation Best Practices', content: 'Watch our comprehensive guide to installing TechnoBit facade systems...', excerpt: 'Expert guide to facade installation techniques.', image: '/images/media/install-video.jpg', type: 'video', date: '2026-01-25', featured: false },
];
