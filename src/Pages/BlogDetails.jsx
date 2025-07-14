import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import blogs from '../Data/Blogs';
import PageHeader from '../Components/PageHeader';
import CustomerReview from '../Components/CustomerReview';
import BrandsSlider from '../Components/BrandsSlider';
import AppleShowcase from '../Components/Apple';
import Footer from '../Components/Footer';
import LatestPosts from '../Components/LatestPost';

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.from(containerRef.current.querySelector('.page-header'), {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Image animation with parallax effect
    tl.from(imageRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.5");

    // Meta info animation
    tl.from(metaRef.current, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Title animation
    tl.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    // Content paragraphs animation
    tl.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.3");

  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <Link to="/blogs" className="text-[#FF6543] hover:underline">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <PageHeader
        title="BLOG"
        previousPage="Blogs"
        previousPageLink="/blogs"
        currentPage={blog.title}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div ref={imageRef} className="relative h-[400px] rounded-xl overflow-hidden mb-8 shadow-xl">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div ref={metaRef} className="flex items-center gap-6 text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <i className="far fa-calendar"></i>
            {blog.date}
          </span>
          <span className="flex items-center gap-2">
            <i className="far fa-folder"></i>
            {blog.category}
          </span>
          <span className="flex items-center gap-2">
            <i className="far fa-clock"></i>
            {blog.readTime} read
          </span>
        </div>

        <h1 ref={titleRef} className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {blog.title}
        </h1>

        <div ref={contentRef} className="prose prose-lg max-w-none">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            to="/blogs" 
            className="inline-flex items-center text-[#FF6543] hover:underline gap-2 group"
          >
            <span className="transform group-hover:-translate-x-2 transition-transform">←</span>
            Back to Blogs
          </Link>
        </div>
      </div>
      <LatestPosts/>
      <CustomerReview/>
      <BrandsSlider/>
      <AppleShowcase/>
      <Footer/>
    </div>
  );
};

export default BlogDetails;
