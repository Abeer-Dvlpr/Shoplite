import { Link } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeader from '../Components/PageHeader';
import blogs from '../Data/Blogs';
import CustomerReview from '../Components/CustomerReview';
import BrandsSlider from '../Components/BrandsSlider';
import AppleShowcase from '../Components/Apple';
import Footer from '../Components/Footer';
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Blogs = () => {
  useGSAP(() => {
    // Animation for page header
    gsap.from(".page-header", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // Animation for blog cards
    gsap.utils.toArray(".blog-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.2)"
      });
    });

    // Hover animation for cards
    gsap.utils.toArray(".blog-card").forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: "power1.out"
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power1.out"
        });
      });
    });
  });

  return (
    <div>
      <PageHeader 
        title="OUR BLOG"
        previousPage="Home"
        previousPageLink="/"
        currentPage="Blogs"
        className="mt-[5rem] page-header"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="blog-card group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#FF6543] text-white px-3 py-1 rounded-full text-sm">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-3">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime} read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#FF6543] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
                <div className="text-[#FF6543] font-medium group-hover:underline">
                  Read More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <CustomerReview/>
      <BrandsSlider/>
      <AppleShowcase/>
      <Footer/>
    </div>
  );
};

export default Blogs;