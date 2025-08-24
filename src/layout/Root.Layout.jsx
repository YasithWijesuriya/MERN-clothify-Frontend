import { Outlet } from "react-router";
import  Navigation  from "@/components/Navigation";
import Footer from "@/components/Footer/Footer";
import ShopPage from "@/pages/shop.page";
function RootLayout(){
    return(
         <>
            <Navigation />
            <ShopPage />
            <Outlet />
            <Footer />
        </>
    )
}
export default RootLayout;