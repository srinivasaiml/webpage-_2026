import SectionPage from '@/components/SectionPage';
import Hero from '@/components/Hero';
import About from '@/components/About';
import HomeArtSection from '@/components/HomeArtSection';

export default function HomePage() {
  return (
    <SectionPage>
      <div className="space-y-0">
        <Hero />
        <About />
        <HomeArtSection />
      </div>
    </SectionPage>
  );
}
