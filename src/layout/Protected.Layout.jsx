import { Outlet , Navigate } from "react-router"
import { useUser } from "@clerk/clerk-react"
import { User } from "lucide-react";

const protectedLayout = () => {
  const { isLoaded , isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/sign-in"/>;

  }
  console.log(User);

  return <Outlet />;

}
export default protectedLayout;