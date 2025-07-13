import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Apple from "../Images/InstagramShoplite/one.png";
import Watch from "../Images/InstagramShoplite/two.png";
import Airpod from "../Images/InstagramShoplite/three.png";
import Mobile from "../Images/InstagramShoplite/four.png";
import Laptop from "../Images/InstagramShoplite/six.png";

gsap.registerPlugin(ScrollTrigger);

const AppleShowcase = () => {
  const rowRef = useRef(null);

  const products = [
    { img: Apple, alt: "MacBook Pro" },
    { img: Watch, alt: "iPad Pro" },
    { img: Airpod, alt: "iPhone" },
    { img: Mobile, alt: "Apple Watch" },
    { img: Laptop, alt: "AirPods" },
  ];

  useGSAP(() => {
    if (!rowRef.current) return;

    gsap.from(rowRef.current.children, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rowRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section className="min-h-screen bg-white py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-gray-900 text-center mb-16">
          Designed with purpose.
        </h2>

        <div
          ref={rowRef}
          className="flex justify-center items-center gap-10 flex-wrap"
        >
          {products.map((product, index) => (
            <div key={index} className="w-40 md:w-52 lg:w-64">
              <img
                src={product.img}
                alt={product.alt}
                className="w-full h-auto object-contain shadow-lg rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless ecosystem of beautifully crafted devices that work together perfectly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppleShowcase;
