import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaSearch, FaTimes } from "react-icons/fa";

const CategoriesSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchText, setSearchText] = useState("");
  const sidebarRef = useRef(null);

  // Simple animation on mount
  useGSAP(() => {
    gsap.from(sidebarRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    
    gsap.from(".filter-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      delay: 0.2
    });
  }, []);

  const categories = ["All", "iPads", "Drones", "Watches", "Ultra HD TVs"];
  const brands = ["All", "Samsung", "Apple", "HP", "Dell", "Honor"];

  const handleReset = () => {
    gsap.to(".filter-item", {
      color: "#FF6543",
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
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
            placeholder="Search..."
            className="px-4 py-2 w-full focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="p-3 bg-[#FF6543] hover:bg-[#e04d32] transition">
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
      >
        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-3 filter-item">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`filter-item cursor-pointer p-2 rounded-md transition-all ${
                  selectedCategory === cat 
                    ? "bg-[#FF6543] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-3 filter-item">Brands</h3>
          <ul className="space-y-2">
            {brands.map((brand) => (
              <li
                key={brand}
                className={`filter-item cursor-pointer p-2 rounded-md transition-all ${
                  selectedBrand === brand
                    ? "bg-[#FF6543] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
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
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition flex items-center justify-center gap-2 filter-item"
        >
          <FaTimes /> Reset Filters
        </button>
      </aside>
    </div>
  );
};

export default CategoriesSidebar;
