import { useState } from "react";
import { Menu, X, ShoppingBag, BellIcon, ChartSpline, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import ProductSearchForm from "./ProductSearchForm";
import Logo from "../components/Logo";

export default function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl md:text-2xl tracking-tight text-gray-900">
            {/* <span className="bg-gradient-to-tr from-yellow-400 to-yellow-600 text-transparent bg-clip-text text-shadow-black">Mebius</span> */}
            <Logo />
          </Link>
          {/* Nav */}
          <nav className="hidden lg:flex space-x-8 items-center font-medium">
            <Link to="/" className="hover:text-yellow-700 transition">Home</Link>
            <Link to="/gallery" className="hover:text-yellow-700 transition">Gallery</Link>
            <Link to="/about" className="hover:text-yellow-700 transition">About Us</Link>
            <Link to="/contact" className="hover:text-yellow-700 transition">Contact</Link>
            <Link to="/my-orders" className="hover:text-yellow-700 transition">My Orders</Link>
            {user?.publicMetadata?.role === "admin" && <>
              <Link to="/admin/products/create" className="bg-black text-white px-3 py-1 rounded shadow text-xs hover:bg-yellow-700 transition">Create Product</Link>
              <Link to="/admin/orders" className="flex items-center bg-black text-white px-3 py-1 rounded shadow space-x-1 text-xs hover:bg-yellow-700 transition"><BellIcon className="h-4 w-4" /><span>AllOrders</span></Link>
              <Link to="/admin/sales-dashboard" className="bg-black text-white px-3 py-1 rounded shadow text-xs hover:bg-yellow-700 transition flex items-center"><ChartSpline className="h-4 w-4" /></Link>
            </>}
          </nav>
          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button
              className="rounded-full p-2 hover:bg-gray-100 transition"
              onClick={() => setShowSearch((v) => !v)}
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              <SearchIcon size={22} />
            </button>
            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded hover:bg-gray-100 transition">
              <ShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {/* Auth */}
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in" className="font-medium hover:text-yellow-700">SignIn</Link>
              <Link to="/sign-up" className="font-medium hover:text-yellow-700">SignUp</Link>
            </SignedOut>
            {/* Mobile Menu Button */}
            <button
              className="flex items-center justify-center p-2 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="w-full shadow-md bg-white border-b border-gray-200 flex justify-center py-4 px-2 animate-fade-in sticky top-16 z-40">
          <div className="w-full max-w-xl">
            <ProductSearchForm onSearch={() => setShowSearch(false)} />
          </div>
        </div>
      )}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold hover:text-yellow-700">Home</Link>
            <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-700">Gallery</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-700">About Us</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-700">Contact</Link>
            <Link to="/my-orders" onClick={() => setIsMenuOpen(false)} className="hover:text-yellow-700">My Orders</Link>
            {user?.publicMetadata?.role === "admin" && (
              <>
                <Link to="/admin/products/create" className="bg-black text-white py-1 px-2 rounded text-xs hover:bg-yellow-700" onClick={() => setIsMenuOpen(false)}>Create Product</Link>
                <Link to="/admin/orders" className="flex items-center bg-black text-white py-1 px-2 rounded text-xs hover:bg-yellow-700 mt-1" onClick={() => setIsMenuOpen(false)}><BellIcon className="h-4 w-4 mr-1" />AllOrders</Link>
                <Link to="/admin/sales-dashboard" className="bg-black text-white py-1 px-2 rounded text-xs hover:bg-yellow-700 flex items-center mt-1" onClick={() => setIsMenuOpen(false)}><ChartSpline className="h-4 w-4" /></Link>
              </>
            )}
            <div className="flex flex-col gap-2 mt-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
              <SignedOut>
                <Link to="/sign-in" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-yellow-700">Sign In</Link>
                <Link to="/sign-up" onClick={() => setIsMenuOpen(false)} className="font-medium hover:text-yellow-700">Sign Up</Link>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
