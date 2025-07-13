import { useState, useRef ,useEffect} from "react";
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
  const cardsRef = useRef([]);
  const [visibleSlides, setVisibleSlides] = useState(4);
  const Reviews = [
    { id: 1, name: "Tony Stark", message: "Amazing tech store! Found exactly what I needed." },
    { id: 2, name: "Steve Rogers", message: "Great wireless earbuds, excellent quality!" },
    { id: 3, name: "Ethan", message: "Fast delivery, outstanding quality. Highly recommend!" },
    { id: 4, name: "Stephen Strange", message: "Knowledgeable staff, perfect device selection." },
    { id: 5, name: "Peter Parker", message: "Best tech store experience ever!" },
    { id: 6, name: "Thor", message: "Excellent service and quality products." },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "expo.out" },
    });

    tl.from(sliderRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
    }).from(
      cardsRef.current,
      {
        scale: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
      },
      
    );
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

  const maxIndex = Reviews.length - visibleSlides;

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

  return (
    <div className="relative max-w-[100rem] mx-auto p-4 overflow-hidden">
      <h2 className="text-3xl font-medium mb-6 text-[#4c4b4b] capitalize">
        CUSTOMERS REVIEWS
      </h2>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / Reviews.length}%)`,
            width: `${(Reviews.length * 100) / visibleSlides}%`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Reviews.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-2"
              style={{
                maxWidth: `${100 / Reviews.length}%`,
                minWidth: "32rem", // Card ki min width barha di
              }}
            >
              <div className="h-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="p-4">
                  <p className="text-lg mb-2">{review.message}</p>
                  <div className="text-xl text-[#FF6543] flex mb-2">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <p className="text-gray-700 font-bold text-lg">{review.name}</p>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full text-xl shadow-md hover:bg-gray-100 z-10 "
      >
        <FaLessThan />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full text-xl shadow-md hover:bg-gray-100 z-10"
      >
        <FaGreaterThan />
      </button>
    </div>
  );
};

export default CustomerReview;
