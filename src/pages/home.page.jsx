import CasualInspirations from "../components/CasualInspirations";
import HeroGrid from "../components/HeroGrid";
import TrendingSection from "../components/TrendingSection";



function HomePage() {
   
  return (
    <>
    <main>
      <HeroGrid />
      <CasualInspirations />
      <TrendingSection/>
    </main>
    </>
  );
}

export default HomePage;