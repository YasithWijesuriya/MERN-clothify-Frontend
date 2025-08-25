// import ColorButton from "@/components/ColorButton";
// import CasualInspirations from "../components/CasualInspirations";
// import HeroGrid from "../components/HeroGrid";
// import TrendingSection from "../components/TrendingSection";
import ShopPage from "./shop.page";

function HomePage() {
  return (
    <>
      <main>
        {/* <HeroGrid />
        <CasualInspirations /> */}
        {/* <CategoryButton /> */}
        {/* <ColorButton /> */}
        <ShopPage />
        <ShopPage showHero={true} showInspiration={true} />
       
      </main>
    </>
  );
}

export default HomePage;
