import { Outlet , Navigate } from "react-router"
import { useUser } from "@clerk/clerk-react"

const AdminProtectedLayout = () => {
  const {user} = useUser();

  const isAdmin = user?.publicMetadata?.role === 'admin';
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  if(isAdmin){
    console.log("Admin access granted!");
  }
  

  return <Outlet />;

}
export default AdminProtectedLayout;