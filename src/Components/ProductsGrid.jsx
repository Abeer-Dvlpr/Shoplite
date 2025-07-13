import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import Sproduct from "../Data/Shop";

const ProductsGrid = () => {
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const gridRef = useRef(null);
  const productRefs = useRef([]);

  // Sort Logic
  const sortedProducts = [...Sproduct].sort((a, b) => {
    if (sortOption === "price-low-high") return a.price - b.price;
    if (sortOption === "price-high-low") return b.price - a.price;
    return 0;
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Animation on mount and updates
  useGSAP(() => {
    // Initial animation
    if (!gridRef.current) return;
    
    gsap.from(gridRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out"
    });

    gsap.from(productRefs.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      delay: 0.2
    });
  }, []);

  // Animation on sort/page change
  useGSAP(() => {
    if (productRefs.current.length === 0) return;

    gsap.to(productRefs.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.in",
      onComplete: () => {
        gsap.set(productRefs.current, { opacity: 0, y: 30 });
        
        gsap.to(productRefs.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)"
        });
      }
    });
  }, [sortOption, currentPage]);

  // Pagination button animations
  useGSAP(() => {
    gsap.from(".pagination-button", {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "back.out(1.2)"
    });
  }, [currentPage]);

  // Add product ref to the array
  const addToRefs = (el) => {
    if (el && !productRefs.current.includes(el)) {
      productRefs.current.push(el);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Sort By */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Products</h2>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-600">Sort by:</label>
          <select
            id="sort"
            className="border border-gray-400 px-4 py-2 rounded focus:outline-none text-gray-600"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1); // Reset to first page when sorting changes
            }}
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id}
            className="block h-80 rounded-lg overflow-hidden shadow hover:shadow-xl transition"
          >
            <div
              ref={addToRefs}
              className="h-full flex flex-col"
            >
              <img 
                src={product.IMG} 
                alt={product.name} 
                className="w-full h-56 object-contain bg-white" 
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-[#FF6543] font-bold">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`pagination-button px-4 py-2 border rounded ${
                currentPage === idx + 1 
                  ? "bg-[#FF6543] text-white" 
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;