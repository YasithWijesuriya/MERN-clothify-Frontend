// src/pages/ShopPage.jsx
import React, { useState } from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { useGetAllProductsQuery,useDeleteProductMutation } from "../lib/api";
import { Trash2 } from "lucide-react";
import {useUser} from "@clerk/clerk-react";

const ShopPage = () => {
  const { category, productId ,categorySlug,colorSlug} = useParams();
  const [imageErrors, setImageErrors] = useState(new Set());
  const dispatch = useDispatch(); // it's use for dispatch to the action redux store

  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductsQuery({
    categorySlug,
    colorSlug,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleImageError = (productId) => {
    setImageErrors((prev) => new Set(prev).add(productId));
  };

  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Failed to load products.</p>;
  }
  //! this part have an error , !!!!!!!!!!!
  const pr = products?.find(p => p._id === productId)
   const handleAddToCart = (p) => {
    // ✅ product object එකෙන්ම cart ට add කරන්න
    if (!pr) return;
    dispatch(
      addToCart({
        _id: p._id,
        name: p.name,
        price: p.price,
        image: p.image,
      })
    );
  };

  const handleDeleteProduct = async (id,name) => {
    const ok = window.confirm(`"${name}" product will be deleted. Are you sure?`);
    if(!ok) return;

    try{
      setDeletingId(id);
      await deleteProduct(id).unwrap();
    }catch(e) {
      console.error(e);
      alert("Failed to delete product");
    }finally{
      setDeletingId(null);
    }
  };

  const filteredProducts = category
    ? products?.filter(
        (product) =>
          product.categorySlug?.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div className="p-6">
      {!filteredProducts || filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products available.
        </p>
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
                {/* Delete Icon (Admin only) */}
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
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {product.name}
                </h2>
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
                    onClick={handleAddToCart}
                    className="flex-1 px-4 py-2 text-center bg-black text-white text-sm font-medium rounded hover:bg-gray-900 transition"
                  >
                    Add to Cart
                  </button>
                  {/* Delete Product Button 
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 px-4 py-2 text-center bg-red-600 text-white text-sm font-medium rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>*/}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
