import HeroSlider from '../components/sections/HeroSlider';
import DiscoverBanner from '../components/sections/DiscoverBanner';
import MarketMap from '../components/sections/MarketMap';
import SystemsGrid from '../components/sections/SystemsGrid';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import TrustedBy from '../components/sections/TrustedBy';
import SustainabilityBlock from '../components/sections/SustainabilityBlock';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <DiscoverBanner />
      <MarketMap />
      <SystemsGrid />
      <FeaturedProjects />
      <TrustedBy />
      <SustainabilityBlock />
    </>
  );
}
