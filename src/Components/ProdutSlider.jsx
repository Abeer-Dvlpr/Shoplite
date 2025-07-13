import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Hproducts from "../Data/Home";

gsap.registerPlugin(ScrollTrigger);

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.from(sliderRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
    })
    
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setVisibleSlides(1);
      else if (window.innerWidth < 640) setVisibleSlides(1);
      else if (window.innerWidth < 768) setVisibleSlides(2);
      else if (window.innerWidth < 1024) setVisibleSlides(3);
      else setVisibleSlides(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = 100 / visibleSlides;
  const totalSlides = Hproducts.length;
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  useGSAP(() => {
    gsap.to(trackRef.current, {
      xPercent: -currentIndex * (100 / visibleSlides),
      duration: 0.3,
      ease: "power2.out",
    });
  }, [currentIndex, visibleSlides]);

  return (
    <div ref={sliderRef} className="relative max-w-6xl mx-auto px-4 py-8 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-medium mb-6 text-[#4c4b4b] capitalize text-center md:text-left">
        BEST SELLING ITEMS
      </h2>

      <div className="relative overflow-hidden">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex transition-transform ease-in-out duration-300 gap-4 md:gap-6"
            style={{ width: `${(100 / visibleSlides) * totalSlides}%` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {Hproducts.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  flex: `0 0 ${cardWidth}%`,
                  maxWidth: `${cardWidth}%`,
                }}
              >
                <div className="relative">
                  <img
                    src={product.IMG}
                    alt={product.name}
                    className="w-full h-40 md:h-56 object-contain p-4 bg-gray-50"
                  />
                </div>
                <div className="p-3 md:p-4 text-center bg-[#e4e4e4]">
                  <h2 className="text-sm md:text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
                  <p className="text-[#FF6543] font-bold text-sm md:text-base">${product.price?.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation buttons - hidden on very small screens */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-100 z-10 text-sm md:text-base"
        >
          <FaLessThan />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white p-2 md:p-3 rounded-full shadow-md hover:bg-gray-100 z-10 text-sm md:text-base"
        >
          <FaGreaterThan />
        </button>
      </div>

      {/* Dots indicator for mobile */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(totalSlides / visibleSlides) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * visibleSlides)}
            className={`w-2 h-2 rounded-full transition-colors ${
              Math.floor(currentIndex / visibleSlides) === i 
                ? 'bg-[#FF6543]' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
