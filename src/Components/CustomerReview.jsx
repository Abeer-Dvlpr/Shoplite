import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGreaterThan, FaLessThan, FaStar } from "react-icons/fa";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [slideWidth, setSlideWidth] = useState(0);

  const Reviews = [
    { id: 1, name: "Tony Stark", message: "Amazing tech store! Found exactly what I needed." },
    { id: 2, name: "Steve Rogers", message: "Great wireless earbuds, excellent quality!" },
    { id: 3, name: "Ethan", message: "Fast delivery, outstanding quality. Highly recommend!" },
    { id: 4, name: "Stephen Strange", message: "Knowledgeable staff, perfect device selection." },
    { id: 5, name: "Peter Parker", message: "Best tech store experience ever!" },
    { id: 6, name: "Thor", message: "Excellent service and quality products." },
  ];

  // Handle responsive layout
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let slides = 3;
      if (width < 640) slides = 1;
      else if (width < 768) slides = 2;
      else if (width < 1024) slides = 3;
      else slides = 4;

      setVisibleSlides(slides);
      
      // Calculate slide width based on container width
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const gap = 16; // 1rem gap
        const width = (containerWidth - (gap * (slides - 1))) / slides;
        setSlideWidth(width);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    tl.from(sliderRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.8,
    }).from(
      cardsRef.current,
      {
        scale: 0.9,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
      },
      "-=0.5"
    );
  }, []);

  const maxIndex = Math.max(0, Reviews.length - visibleSlides);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  // Calculate transform value for smooth sliding
  const getTransformValue = () => {
    if (visibleSlides >= Reviews.length) return 0;
    return -(currentIndex * (100 / visibleSlides));
  };

  return (
    <div className="relative max-w-[100rem] mx-auto px-4 py-12 overflow-hidden">
      <h2 className="text-3xl font-medium mb-12 text-[#4c4b4b] capitalize text-center">
        CUSTOMERS REVIEWS
      </h2>

      <div ref={containerRef} className="relative overflow-hidden px-2 sm:px-4">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${getTransformValue()}%)`,
            gap: "1rem",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Reviews.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="flex-shrink-0"
              style={{
                width: `${slideWidth}px`,
                minWidth: `${slideWidth}px`,
              }}
            >
              <div className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white p-6">
                <p className="text-base sm:text-lg mb-4">{review.message}</p>
                <div className="text-lg sm:text-xl text-[#FF6543] flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-700 font-bold text-base sm:text-lg">
                  {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full text-lg sm:text-xl shadow-md hover:bg-gray-100 z-10 transition-colors"
        aria-label="Previous review"
      >
        <FaLessThan />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full text-lg sm:text-xl shadow-md hover:bg-gray-100 z-10 transition-colors"
        aria-label="Next review"
      >
        <FaGreaterThan />
      </button>
    </div>
  );
};

export default CustomerReview;