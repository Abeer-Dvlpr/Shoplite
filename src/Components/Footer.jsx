import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    // Footer entrance animation
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Logo hover animation
    const el = logoRef.current;
    const handleEnter = () => {
      gsap.to(el, { scale: 1.15, rotate: 5, duration: 0.4, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(el, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-50 text-gray-700 border-t border-gray-200 pt-20 pb-10 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        
        {/* Company */}
        <div>
          <h3
            ref={logoRef}
            className="text-3xl font-semibold text-gray-900 mb-6 hover:text-[#FF6543] cursor-pointer transition-colors"
          >
            Shoplite
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xs">
            Experience seamless shopping with trusted design and simplicity at the heart of everything we do.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">Quick Links</h3>
          <ul className="space-y-4 text-base">
            <li><a href="#" className="hover:text-black">Home</a></li>
            <li><a href="#" className="hover:text-black">Shop</a></li>
            <li><a href="#" className="hover:text-black">About</a></li>
            <li><a href="#" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Help & Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">Help & Info</h3>
          <ul className="space-y-4 text-base">
            <li><a href="#" className="hover:text-black">FAQs</a></li>
            <li><a href="#" className="hover:text-black">Shipping</a></li>
            <li><a href="#" className="hover:text-black">Returns</a></li>
            <li><a href="#" className="hover:text-black">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">Contact</h3>
          <ul className="space-y-4 text-base">
            <li>Email: support@shoplite.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li className="flex space-x-5 mt-6">
              <a href="#" className="hover:text-black text-2xl"><FaFacebook className="text-blue-500" /></a>
              <a href="#" className="hover:text-black text-2xl"><FaTwitter className="text-blue-400" /></a>
              <a href="#" className="hover:text-black text-2xl"><FaInstagram className="text-pink-500" /></a>
              <a href="#" className="hover:text-black text-2xl"><FaYoutube className="text-red-500" /></a>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-200 mt-12 pt-6 text-base text-center text-gray-500">
        © {new Date().getFullYear()} Shoplite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
