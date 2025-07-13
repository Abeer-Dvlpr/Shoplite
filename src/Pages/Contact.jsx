import React, {  useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import IMG from "../Images/Contact.png"
import PageHeader from '../Components/PageHeader';
import CustomerReview from '../Components/CustomerReview';
import LatestPosts from '../Components/LatestPost';
import BrandsSlider from '../Components/BrandsSlider';
import Footer from '../Components/Footer';
import AppleShowcase from '../Components/Apple';
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, []);

  return (
    <>

    <PageHeader title="Contact" previousPage="Cart" previousPageLink="/Cart" currentPage="Contact" />
    <div ref={sectionRef} className=" text-gray-600 p-10 space-y-20 font-sans flex flex-col justify-center items-center">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-4xl font-normal tracking-wide">CONTACT INFO</h2>
          <p className="text-gray-400 text-md">
            Tortor dignissim convallis aenean et tortor at risus viverra adipiscing.
          </p>

          <div>
            <h3 className="text-xl mb-4">OFFICE</h3>
            <p className="text-md text-gray-400">730 Glenstone Ave 65802, Springfield, US</p>
            <p className="text-md text-gray-400">+123 222 333 44</p>
            <p className="text-md text-gray-400">info@yourinfo.com</p>
          </div>

          <div>
            <h3 className="text-xl mb-4">MANAGEMENT</h3>
            <p className="text-md text-gray-400">730 Glenstone Ave 65802, Springfield, US</p>
            <p className="text-md text-gray-400">+123 666 777 88</p>
            <p className="text-md text-gray-400">info@yourinfo.com</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <h2 className="text-4xl ">ANY QUESTIONS?</h2>
          <p className="text-md text-gray-400 mb-4">Use the form below to get in touch with us.</p>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Your full name *"
              className="w-1/2 p-3 rounded-md text-gray-600"
            />
            <input
              type="email"
              placeholder="Write your email here *"
              className="w-1/2 p-3 rounded-md text-gray-600"
            />
          </div>

          <input
            type="text"
            placeholder="Phone number"
            className="w-full p-3 rounded-md text-gray-600"
          />

          <input
            type="text"
            placeholder="Write your subject here"
            className="w-full p-3 rounded-md text-gray-600"
          />

          <textarea
            placeholder="Write your message here *"
            className="w-full p-3 rounded-md text-gray-600 h-32 border border-gray-400"
          ></textarea>

          <button className="bg-[#ff5b3d] px-16 py-3 text-white rounded-xl mt-2">
            SUBMIT
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img src={IMG} alt="Contact" className="rounded-lg h-[34rem] w-full" />
        </div>

        {/* Store Info */}
        <div>
          <h2 className="text-2xl font-semibold">OUR STORES</h2>
          <p className="text-md text-gray-400 mb-4">
            You can also directly buy products from our stores.
          </p>

          <div className="mb-6">
            <h3 className="font-semibold text-xl">USA</h3>
            <p className="text-md text-gray-400">730 Glenstone Ave 65802, US</p>
            <p className="text-md text-gray-400">+123 666 777 88</p>
            <p className="text-md text-gray-400">info@yourinfo.com</p>
          </div>

          <div>
            <h3 className="font-semibold text-xl">FRANCE</h3>
            <p className="text-md text-gray-400">13 Rue Montmartre 75001, Paris, France</p>
            <p className="text-md text-gray-400">+123 222 333 44</p>
            <p className="text-md text-gray-400">info@yourinfo.com</p>
          </div>
        </div>
      </div>
    </div>
          <div className="mt-[5rem] mb-[5rem]">
        <CustomerReview />
      </div>
      <LatestPosts />
      <div className="mt-[5rem] mb-[5rem]">
       <BrandsSlider/>
      </div>
      
      <AppleShowcase/>
    
        <Footer/>
        </>
  );
};

export default Contact;
