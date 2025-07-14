import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Hproducts from "../Data/Home";

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  const [visibleSlides, setVisibleSlides] = useState(4);

  // Handle responsive number of slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
      } else if (window.innerWidth < 768) {
        setVisibleSlides(2);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(3);
      } else {
        setVisibleSlides(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.ceil(Hproducts.length / visibleSlides) - 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-medium mb-6 text-[#4c4b4b]">Best Selling Items</h2>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Hproducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id} 
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 p-2"
            >
              <div className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
                <img 
                  src={product.IMG} 
                  alt={product.name} 
                  className="w-full h-48 object-contain p-4 bg-gray-50" 
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-orange-500 font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
      >
        <FaLessThan className="rotate-180" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
      >
        <FaGreaterThan />
      </button>
    </div>
  );
};

export default ProductSlider; 