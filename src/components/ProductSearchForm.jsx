import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function ProductSearchForm({ onSearch }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // focus input automatically on open
    inputRef.current?.focus();
  }, []);

const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (search.trim()) {
    navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    setSearch("");
    if (onSearch) onSearch();
  }
};

  return (
    <form onSubmit={handleSearchSubmit} className="flex w-full max-w-lg mx-auto">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        className="border px-4 py-2 rounded-l-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 rounded-r-lg flex items-center justify-center"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
