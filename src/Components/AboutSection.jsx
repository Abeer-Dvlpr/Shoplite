import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import video from "../assets/AboutVideo.mp4";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(sectionRef.current.querySelector(".image-box"), {
      x: -150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    })
    .from(sectionRef.current.querySelector(".text-box"), {
      x: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }, "-=1");
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section ref={sectionRef} className="flex flex-col lg:flex-row items-center justify-center w-full max-w-[1200px] mx-auto py-24 px-4 gap-16">
      
      {/* Left Side Video */}
      <div className="image-box relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Play/Pause Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center bg-white hover:scale-110 transition shadow-lg"
            onClick={togglePlay}
          >
            {isPlaying ? <FaPause className="text-2xl text-gray-700" /> : <FaPlay className="text-2xl text-gary-700" />}
          </button>
        </div>
      </div>

      {/* Right Side Text */}
      <div className="text-box w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-4xl lg:text-4xl font-semibold text-[#3f3f3f] mb-6 leading-tight">
          BEST DIGITAL STORE BASIC STORE
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit amet.
          Nulla adipiscing pharetra pellentesque maecenas odio eros at.
        </p>
        <p className="text-gray-600 text-lg mb-8">
          Et libero vulputate amet duis erat volutpat vitae eget.
          Sed vitae metus nibh sit amet. Quam libero etiam et in ac at quis.
        </p>

        <Link to="/shop">
          <button className="bg-[#FF6543] text-white py-4 px-10 text-lg rounded-full hover:bg-[#e04d32] transition shadow-lg">
            GO TO SHOP
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
