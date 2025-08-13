import { useState } from "react";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useGetAllCategoriesQuery } from "../lib/api"; // <- API hook import

export default function Navigation() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-16 shadow-md">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold md:text-2xl sm:text-xl">
          Mebius
        </Link>

        {/* Desktop Navigation */}
       {/* <nav className="hidden md:flex space-x-8">
          <Link to="/shop" className="font-medium hover:text-gray-600">
            All
          </Link>
          {!isLoading &&
            !error &&
            categories?.map((cat) => (
              <Link
                key={cat._id}
                to={`/shop/${cat.categorySlug}`}
                className="font-medium hover:text-gray-600"
              >
                {cat.name}
              </Link>
            ))}
        </nav> */}
       
        {user?.publicMetadata?.role === "admin" && (
          <Link
            to="/admin/products/create"
            className="font-medium hover:text-gray-600 bg-black text-white sm:md:px-2 md:py-1 rounded-xl md:text-[15px] sm:text-[8px]"
          >
            Create Product
          </Link>
        )}

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="p-1">
            <Search size={20} />
          </button>
          <Link
            to="/shop/cart"
            aria-label="Shopping Bag"
            className="p-1 relative"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="hidden md:block">
            <SignedOut>
              <div className="flex items-center gap-4">
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </div>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
           {/*<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
           <Link
              to="/shop"
              className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
              onClick={closeMobileMenu}
            >
              All
            </Link>
            {!isLoading &&
              !error &&
              categories?.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/shop/${cat.categorySlug}`}
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-100 rounded-md"
                  onClick={closeMobileMenu}
                >
                  {cat.name}
                </Link>
              ))}
          </div>*/}

          <div className="block md:hidden px-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-4">
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
