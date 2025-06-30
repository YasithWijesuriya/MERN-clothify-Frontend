import Navigation from "@/components/ui/Navigation";
import CasualInspirations from "../components/ui/CasualInspirations";
import HeroGrid from "../components/ui/HeroGrid";
import TrendingSection from "../components/ui/TrendingSection";



function HomePage() {
   
  return (
    <>
    <Navigation />
    <main>
      <HeroGrid />
      <CasualInspirations />
      <TrendingSection/>
    </main>
    </>
  );
}

export default HomePage;