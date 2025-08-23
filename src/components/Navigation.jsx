import { useState } from "react";
import { Menu, X, ShoppingBag, Search, User, BellIcon ,ChartSpline} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

export default function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 lg:px-16 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl md:text-2xl mr-15">
          Mebius
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="font-medium hover:text-gray-600">Home</Link>
          <Link to="/Gallery" className="font-medium hover:text-gray-600">Gallery</Link>
          <Link to="/About" className="font-medium hover:text-gray-600">About Us</Link>
          <Link to="/Contact" className="font-medium hover:text-gray-600">Contact</Link>
          <Link to="/my-orders" className="font-medium hover:text-gray-600">My Orders</Link>

          {user?.publicMetadata?.role === "admin" && (
            <>
              <Link
                to="/admin/products/create"
                className="font-medium hover:text-gray-600 bg-black text-white px-3 py-1 rounded-lg text-sm"
              >
                Create Product
              </Link>
              <Link
                to="/admin/orders"
                className="font-medium hover:text-gray-600 flex   bg-black text-white px-3 py-1 rounded-lg text-sm space-x-1"
              >
                 <BellIcon size={20} />
                <span >AllOrders</span>
                
              </Link>
              <Link
                to="/admin/sales-dashboard"
                className="font-medium hover:text-gray-600 bg-black text-white px-3 py-1 rounded-lg text-sm"
              >
                <ChartSpline size={20} />
              </Link>
            </>
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="p-1">
            <Search size={20} />
          </button>

          <Link to="/shop/cart" className="relative p-1">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Clerk Auth */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut className="hidden md:flex gap-4">
            <Link to="/sign-in" className="font-medium">Sign In</Link>
            <Link to="/sign-up" className="font-medium">Sign Up</Link>
          </SignedOut>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-gray-600">Home</Link>
            <Link to="/Gallery" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-gray-600">Gallery</Link>
            <Link to="/About" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-gray-600">About Us</Link>
            <Link to="/Contact" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-gray-600">Contact</Link>
            <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-gray-600">My Orders</Link>

           {user?.publicMetadata?.role === "admin" && (
              <div className="flex space-x-2">
                {/* Create Product Button */}
                <Link
                  to="/admin/products/create"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center font-medium hover:text-white bg-black text-white px-3 py-1 rounded text-sm"
                >
                  Create Product
                </Link>

                {/* Orders Button with Bell Icon */}
                <Link
                  to="/admin/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center font-medium hover:text-white bg-black text-white px-3 py-1 rounded text-sm space-x-1"
                >
                  <BellIcon size={16} />
                  <span>AllOrders</span>
                </Link>
                <Link
                  to="/admin/sales-dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center font-medium hover:text-white bg-black text-white px-3 py-1 rounded text-sm"
                >
                  <ChartSpline size={16} />
                </Link>
              </div>
            )}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut className="flex flex-col gap-2 mt-2">
              <Link to="/sign-in" onClick={() => setIsMenuOpen(false)} className="font-medium">Sign In</Link>
              <Link to="/sign-up" onClick={() => setIsMenuOpen(false)} className="font-medium">Sign Up</Link>
            </SignedOut>

          </nav>
        </div>
      )}
    </header>
  );
}
