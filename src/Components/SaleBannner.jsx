import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppleIMG from "../Images/SaleBannnerIMG/AppleIMG.png";

gsap.registerPlugin(ScrollTrigger);

const AppleSaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 1,
    minutes: 1,
    seconds: 1,
  });

  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const timerRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days--;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
      },
    });

    tl.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
      .from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")
      .from(timerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(buttonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
      }, "-=0.6");

  }, []);

  return (
    <div ref={bannerRef} className="flex justify-center items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl w-full">

        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            ref={imageRef}
            src={AppleIMG}
            alt="Apple Collection"
            className="w-80 md:w-full"
          />
        </div>

        {/* Right Side - Text & Timer */}
        <div className="text-center md:text-left">
          <h2 ref={textRef} className="text-3xl md:text-6xl font-light text-gray-800 mb-[2rem]">
            30% DISCOUNT ON <br /> APPLE COLLECTION
          </h2>

          {/* Timer */}
          <div ref={timerRef} className="flex justify-center md:justify-start space-x-6 mb-6">
            {["days", "hours", "minutes", "seconds"].map((unit, index) => (
              <div key={index} className="text-center">
                <p className="text-[40px] font-normal">{String(timeLeft[unit]).padStart(2, "0")}</p>
                <p className="text-sm text-gray-500">{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
              </div>
            ))}
          </div>

          <button
            ref={buttonRef}
            className="bg-[#FF6543] text-white py-4 px-6 rounded-full hover:bg-orange-600 transition opacity-0 scale-95"
          >
            SHOP COLLECTION
          </button>

        </div>
      </div>
    </div>
  );
};

export default AppleSaleBanner;
