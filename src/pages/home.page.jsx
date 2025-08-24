import ColorButton from "@/components/ColorButton";
import CasualInspirations from "../components/CasualInspirations";
import HeroGrid from "../components/HeroGrid";
import CategoryButton from "@/components/CategoryButton";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <>
      <main>
        <HeroGrid />
        <CasualInspirations />
        <CategoryButton />
        <ColorButton />

        
        <Outlet />
      </main>
    </>
  );
}

export default HomePage;
