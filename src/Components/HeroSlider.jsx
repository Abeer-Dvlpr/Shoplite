import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Camera from "../Images/Sider-Camera.png";
import Samsung from "../Images/Galaxy-S25-Ultra-Titanium-Gray-Smartphone-Samsung-Flagship.png"
import Laptop from "../Images/laptop.png"

const slides = [
  {
    title: "Samsung Galaxy S25 Ultra",
    desc: "The game changer mobile with high quailty camera.",
    img: Samsung,
  },
  {
    title: "Honor Magic Book 16x",
    desc: "The best quaility laptop with low price and high performace.",
    img: Laptop,
  },
  {
    title: "BEST DSLR CAMERA",
    desc: "Capture your moments in HD quality!",
    img: Camera,
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef();
  const imageRef = useRef();

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

useEffect(() => {
  gsap.killTweensOf(imageRef.current); // Purani animations hata do

  const tl = gsap.timeline();

  // Content Animation
  tl.fromTo(
    contentRef.current,
    { x: -50, opacity: 0 ,scale:0.8},
    { x: 0, opacity: 1, duration: 0.8, scale:1,ease: "power3.out" }
  );

  // Image Entry Animation
  tl.fromTo(
    imageRef.current,
    { scale: 0.8, opacity: 0, y: 10 },
    { scale: 1, opacity: 1, y: -5, duration: 0.8, ease: "power3.inOut" }
  );

  // Floating Animation After Entry
  tl.to(imageRef.current, {
    y: -15,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "power1.inOut",
  });
}, [current]);



  return (
    <div className="relative w-full min-h-[80vh] bg-[#f9f9f9] flex flex-col md:flex-col-reverse lg:flex-col-reverse items-center justify-center xl:flex-row">
      {/* Content - now appears first on mobile */}
      <div 
        ref={contentRef} 
        className="text-center mb-[2rem] md:text-start z-10 order-2 md:order-1 mt-8 md:mt-0 mr-[4rem] xl:-mb-20"
      >
        <h2 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl  font-bold text-[#272727] mb-4">
          {slides[current].title}
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          {slides[current].desc}
        </p>
        <button className="bg-[#FF6543] text-white px-6 py-3 rounded-full hover:bg-[#e05436] transition">
          SHOP COLLECTION
        </button>
      </div>

      {/* Image - now appears second on mobile */}
      <div className="order-1 lg:order-2">
        <img
          ref={imageRef}
          src={slides[current].img}
          alt="Product"
          className="w-[250px] md:w-[400px] h-auto object-contain rounded-full "
        />
      </div>

      {/* Arrows - positioned differently on mobile */}
  <button
  onClick={prevSlide}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black bg-white shadow p-3 rounded"
>
  <FaArrowLeft />
</button>

<button
  onClick={nextSlide}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black bg-white shadow p-3 rounded"
>
  <FaArrowRight />
</button>

    </div>
  );
}

export default HeroSlider;