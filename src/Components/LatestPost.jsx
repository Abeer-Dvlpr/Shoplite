import {  useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const LatestPosts = () => {
  const posts = [
    {
      id: 1,
      category: "Gadgets",
      title: "5 Must-Have Gadgets for the Modern Home",
      desc: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets for the modern lifestyle.",
      img: "/Images/LatestPost/Mac.png",
    },
    {
      id: 2,
      category: "Phones",
      title: "Eco-Friendly Innovations Making a Difference",
      desc: "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative eco-friendly solutions reshaping the tech industry.",
      img: "/Images/LatestPost/Iphone.png",
    },
    {
      id: 3,
      category: "Tech",
      title: "The Future of Wearable Tech: Trends to Watch",
      desc: "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology. Explore emerging trends and exciting advancements.",
      img: "/Images/LatestPost/Laptop.png",
    },
    {
      id: 4,
      category: "Digital Watch",
      title: "Top Apps and Tools for Remote Work",
      desc: "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay connected, organized, and efficient.",
      img: "/Images/LatestPost/Watch.png",
    },
  ];

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    cardsRef.current.forEach((el) => {
      gsap.from(el, {
        y:500,
        opacity: 0,
        duration: 1.3,
        ease: "expo",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12" ref={containerRef}>
      <h2 className="text-3xl font-semibold mb-8 border-b border-gray-300 pb-2 text-gray-700">
        LATEST POSTS
      </h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="text-gray-900 shadow-md hover:shadow-lg transition rounded-lg overflow-hidden bg-white"
          >
            <div className="relative">
              <img src={post.img} alt={post.category} className="w-full h-auto" />
              <span className="absolute top-2 left-2 bg-[#FF6543] text-xs text-white px-2 py-1 font-semibold rounded-sm">
                {post.category.toUpperCase()}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{post.title.toUpperCase()}</h3>
              <p className="text-[1rem] text-gray-500 mb-2">
                {post.desc.slice(0, 100)}...
              </p>
              <a href="#" className="text-[#FF6543] text-[1rem] font-semibold hover:underline">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
