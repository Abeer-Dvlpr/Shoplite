import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const LatestPosts = () => {
  const posts = [
    {
      id: '1',
      category: "Gadgets",
      title: "5 Must-Have Gadgets for the Modern Home",
      desc: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets for the modern lifestyle.",
      img: "/Images/LatestPost/Mac.png",
    },
    {
      id: '2',
      category: "Phones",
      title: "Eco-Friendly Innovations Making a Difference",
      desc: "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative eco-friendly solutions reshaping the tech industry.",
      img: "/Images/LatestPost/Iphone.png",
    },
    {
      id: '3',
      category: "Tech",
      title: "The Future of Wearable Tech: Trends to Watch",
      desc: "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology. Explore emerging trends and exciting advancements.",
      img: "/Images/LatestPost/Laptop.png",
    },
    {
      id: '4',
      category: "Digital Watch",
      title: "Top Apps and Tools for Remote Work",
      desc: "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay connected, organized, and efficient.",
      img: "/Images/LatestPost/Watch.png",
    },
  ];

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Initialize animations
  gsap.context(() => {
    cardsRef.current.forEach((el) => {
      gsap.from(el, {
        y: 500,
        opacity: 0,
        duration: 1.3,
        ease: "expo",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  });

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, index) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#FF6543] text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3">{post.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestPosts;
