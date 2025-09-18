import React, { useState } from "react";
import { Link, useParams,useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { useGetAllProductsQuery, useDeleteProductMutation } from "../lib/api";
import { Trash2, Search } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import PriceSort from "@/components/SortProductByPrice";
import ColorButton from "@/components/ColorButton";
import CategoryButton from "@/components/CategoryButton";
import CasualInspirations from "../components/CasualInspirations";
import HeroGrid from "../components/HeroGrid";
import { motion } from "framer-motion";
import { useEffect } from "react";

const ShopPage = ({ showHero = false, showInspiration = false }) => {
  const { category, categorySlug, colorSlug } = useParams();

  const [imageErrors, setImageErrors] = useState(new Set());
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  useEffect(() => {
    
    window.scrollTo({ top: 0, behavior: "instant" });
  },);
  

  const dispatch = useDispatch();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const { data: products, isLoading, error } = useGetAllProductsQuery({
    categorySlug,
    colorSlug,
    sortByPrice,
    search: searchTerm, 
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleImageError = (productId) => {
    setImageErrors((prev) => new Set(prev).add(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  const handleDeleteProduct = async (id, name) => {
    const ok = window.confirm(`"${name}" product will be deleted. Are you sure?`);
    if (!ok) return;

    try {
      setDeletingId(id);
      await deleteProduct(id).unwrap();
    } catch (e) {
      console.error(e);
      alert("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  
  const filteredProducts = (products || []).filter((product) => {
  if (category && product.categorySlug?.toLowerCase() !== category.toLowerCase()) return false;
  if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
  return true;
});

  if (isLoading) {
    return (
      
      <div className="flex justify-center items-center mt-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600 text-sm font-medium">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md text-center">
          <p className="font-semibold text-lg">⚠️ Failed to load products</p>
          <p className="text-sm mt-1">Please try refreshing the page or check your connection.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
       <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {showHero && <HeroGrid />}
      {showInspiration && <CasualInspirations />}



      <CategoryButton />
      <ColorButton />
      <Link
      to={`/shop`}
      >
      <PriceSort sortByPrice={sortByPrice} setSortByPrice={setSortByPrice} />
      </Link>

      {!filteredProducts || filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isThisDeleting = isDeleting && deletingId === product._id;
            return (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-56 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(product._id)}
                  />
                  {imageErrors.has(product._id) && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-gray-50">
                      Image not available
                    </div>
                  )}

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product._id, product.name)}
                      disabled={isThisDeleting}
                      aria-label={`Delete ${product.name}`}
                      className={`absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow 
                                  border transition ${
                                    isThisDeleting ? "opacity-60 cursor-not-allowed" : ""
                                  }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h2>
                  <p className="text-blue-600 font-bold mt-1 mb-4">
                    LKR {product.price.toLocaleString()}
                  </p>

                  <div className="mt-auto flex gap-2">
                    <Link
                      to={`/product/${product._id}`}
                      className="flex-1 px-4 py-2 text-center bg-yellow-700 text-white text-sm font-medium rounded hover:bg-yellow-600 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product}
                      className="flex-1 px-4 py-2 text-center bg-black text-white text-sm font-medium rounded hover:bg-gray-900 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </motion.div>
    </div>
  );
};

export default ShopPage;
