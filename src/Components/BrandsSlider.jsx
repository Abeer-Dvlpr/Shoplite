import { useEffect, useRef } from "react";
import gsap from "gsap";

const BrandsSlider = () => {
  const sliderRef = useRef(null);
  const brandsRef = useRef(null);

  const brands = [
    "Apple",
    "Samsung",
    "Sony",
    "Google",
    "Microsoft",
    "Dell",
    "HP",
    "Asus",
    "Nike",
    "Adidas",
  ];

  useEffect(() => {
    if (!brandsRef.current || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      const brandsWidth = brandsRef.current.scrollWidth / 2;
      const duration = brands.length * 6;

      const animation = gsap.to(".brand-slide", {
        x: -brandsWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % brandsWidth),
        },
      });

      const brandsContainer = brandsRef.current;

      const handleMouseEnter = () => animation.timeScale(0);
      const handleMouseLeave = () => animation.timeScale(1);

      brandsContainer.addEventListener("mouseenter", handleMouseEnter);
      brandsContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        animation.kill();
        brandsContainer.removeEventListener("mouseenter", handleMouseEnter);
        brandsContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sliderRef);

    return () => ctx.revert();
  }, [brands.length]); // dependency array safe rakho

  return (

  <div className="py-8 overflow-hidden relative border-y border-gray-200 ">
    <div className="absolute inset-y-0 left-0 w-24 to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-24 to-transparent z-10 pointer-events-none" />

    <div ref={sliderRef} className="relative">
      <div
        ref={brandsRef}
        className="flex w-max gap-x-16 uppercase font-bold text-gray-300 px-4"
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className="brand-slide flex items-center gap-x-[8rem]"
          >
            <span className="text-6xl min-w-[25rem] hover:text-[#FF6543] transition-colors duration-300">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default BrandsSlider;
