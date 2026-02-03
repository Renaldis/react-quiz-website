import HomeBanner from '@/components/Home/LandingPageBanner';
import HomeCard from '@/components/Home/LandingPageCard';

export default function Home() {
  return (
    <div className="p-4">
      <HomeBanner />
      <HomeCard />
    </div>
  );
}
