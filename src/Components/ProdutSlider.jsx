import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import Hproducts from "../Data/home";

gsap.registerPlugin(ScrollTrigger);

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(4);
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
      if (window.innerWidth < 640) setVisibleSlides(1);
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useGSAP(() => {
    gsap.to(trackRef.current, {
      xPercent: -currentIndex * (100 / visibleSlides),
      duration: 0.2,
      ease: "power2.out",
    });
  }, [currentIndex, visibleSlides]);

  return (
    <div ref={sliderRef} className="relative max-w-6xl mx-auto p-4 overflow-hidden ">
      <h2 className="text-3xl font-medium mb-6 text-[#4c4b4b] capitalize">
        BEST SELLING ITEMS
      </h2>

      <div className="relative overflow-hidden">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex transition-transform ease-in-out duration-500 gap-[2rem]"
            style={{ width: `${(100 / visibleSlides) * totalSlides}%` }}
          >
            {Hproducts.map((product, index) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  flex: `0 0 ${cardWidth}%`,
                  maxWidth: `${cardWidth}%`,
                }}
              >
                <img
                  src={product.IMG}
                  alt={product.name}
                  className="w-full h-56 object-contain p-4"
                />
                <div className="p-4 text-center bg-[#e4e4e4] ">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                
                  
                  <p className="text-[#FF6543] font-bold">${product.price?.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
        >
          <FaLessThan />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
        >
          <FaGreaterThan />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
