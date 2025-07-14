import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const CategoriesSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchText, setSearchText] = useState("");

  const categories = ["All", "iPads", "Drones", "Watches", "Ultra HD TVs"];
  const brands = ["All", "Samsung", "Apple", "HP", "Dell", "Honor"];

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSearchText("");
  };

  return (
    <div className="w-full lg:w-64">
      {/* Search Bar */}
      <div className="mb-6 filter-item">
        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#FF6543]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="p-3 bg-[#FF6543] hover:bg-[#e04d32] transition-colors">
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside 
        className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-100 sticky top-4"
      >
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-[#FF6543] rounded-full mr-2"></span>
            Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer p-2 rounded-md transition-all duration-200 ${
                  selectedCategory === cat 
                    ? "bg-[#FF6543] text-white font-medium shadow-md"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-medium text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-[#FF6543] rounded-full mr-2"></span>
            Brands
          </h3>
          <ul className="space-y-1">
            {brands.map((brand) => (
              <li
                key={brand}
                className={`cursor-pointer p-2 rounded-md transition-all duration-200 ${
                  selectedBrand === brand
                    ? "bg-[#FF6543] text-white font-medium shadow-md"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium hover:shadow-md"
        >
          <FaTimes className="text-sm" /> Reset Filters
        </button>
      </aside>
    </div>
  );
};

export default CategoriesSidebar;
