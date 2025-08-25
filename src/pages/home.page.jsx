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
        {/* Shop section integrated directly without routing conflicts */}
        <div className="mt-16">
          <ShopPage />
        </div>
      </main>
    </>
  );
}

export default HomePage;
