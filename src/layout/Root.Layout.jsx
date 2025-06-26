import { Outlet } from "react-router";
import  Navigation  from "@/components/ui/Navigation";

function RootLayout(){
    return(
         <>
            <Navigation />
            <Outlet />
        </>
    )
}
export default RootLayout;