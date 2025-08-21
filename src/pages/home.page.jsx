import ColorButton from "@/components/ColorButton";
import CasualInspirations from "../components/CasualInspirations";
import HeroGrid from "../components/HeroGrid";
// import TrendingSection from "../components/TrendingSection";
import ShopPage from "./shop.page";
import CategoryButton from "@/components/CategoryButton";





function HomePage() {
   
  return (
    <>
    <main>
      <HeroGrid />
      <CasualInspirations />
      <CategoryButton />
      <ColorButton />
      <ShopPage />
    </main>
    </>
  );
}

export default HomePage;