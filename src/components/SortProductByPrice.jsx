import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react"; // lucide-react icons

export default function PriceSort({ sortByPrice, setSortByPrice }) {
  return (
    <div className="price-sort bg-black p-3 rounded-lg mb-2 inline-block">
      {/* Label with icon */}
      <div className="inline-flex items-center bg-gray-800 text-white px-3 py-1 rounded-lg font-medium mr-3">
        <span className="mr-2">Sort by Price:</span>
        {sortByPrice === "asc" && <ArrowUp className="w-4 h-4" />}
        {sortByPrice === "desc" && <ArrowDown className="w-4 h-4" />}
      </div>

      {/* Select dropdown */}
      <select
        id="sort"
        value={sortByPrice}
        onChange={(e) => setSortByPrice(e.target.value)}
        className="px-3 py-1 rounded border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option className="text-black" value="">Default</option>
        <option className="text-black" value="asc">Low to High</option>
        <option className="text-black" value="desc">High to Low</option>
      </select>
    </div>
  );
}
