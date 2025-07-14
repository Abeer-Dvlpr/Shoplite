import {  useRef } from 'react';
import { gsap } from 'gsap';
import PageHeader from "../Components/PageHeader";
import { useGSAP } from '@gsap/react';
import { useSearchParams } from 'react-router-dom';
import LatestPosts from '../Components/LatestPost';
import CustomerReview from '../Components/CustomerReview';
import BrandsSlider from '../Components/BrandsSlider';
import AppleShowcase from '../Components/Apple';
import Footer from '../Components/Footer';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const totalFromCart = searchParams.get('total') || '0.00';
  const isDirectOrder = searchParams.get('direct_order') === 'true';
  const formRef = useRef(null);
  const totalsRef = useRef(null);
  const headerRef = useRef(null);
  const orderButtonRef = useRef(null);
  const confirmationRef = useRef(null);

  useGSAP(() => {
    // Disable animations temporarily to ensure button visibility
    // Initial animations
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(formRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
      ease: "back.out(1.2)"
    });

    // Ensure button is always visible
    gsap.set(orderButtonRef.current, {
      opacity: 1,
      visibility: 'visible',
      display: 'block'
    });

    // Input focus animations
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          borderColor: '#4b5563',
          boxShadow: '0 0 0 3px rgba(75, 85, 99, 0.3)',
          duration: 0.3
        });
      });
      input.addEventListener('blur', () => {
        gsap.to(input, {
          borderColor: '#d1d5db',
          boxShadow: 'none',
          duration: 0.3
        });
      });
    });
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const button = orderButtonRef.current;
    
    // Button click animation
    gsap.to(button, {
      scale: 0.95,
      backgroundColor: '#374151',
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
    
    // Enhanced confirmation animation
    gsap.to(confirmationRef.current, {
      opacity: 1,
      y: 0,
      scale: 1.05,
      duration: 0.6,
      delay: 0.3,
      ease: "back.out(1.2)"
    });
    
    // Add success icon animation
    gsap.fromTo(".success-icon", 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.5, delay: 0.8, ease: "back.out(1.2)" }
    );
    
    // Add confetti effect
    createConfetti();
    
    // Hide confirmation after 4 seconds and redirect
    setTimeout(() => {
      gsap.to(confirmationRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.4
      });
      
      // Redirect to home page after animation
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }, 4000);
  };

  const createConfetti = () => {
    const colors = ['#FF6543', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      document.body.appendChild(confetti);
      
      gsap.to(confetti, {
        y: window.innerHeight + 10,
        rotation: Math.random() * 360,
        duration: 3 + Math.random() * 2,
        ease: "power1.out",
        onComplete: () => confetti.remove()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-10 px-2 sm:px-4 lg:px-40">
      <div ref={headerRef}>
        <PageHeader 
          title="CHECKOUT" 
          previousPage="Shop" 
          previousPageLink="/Shop" 
          currentPage="Checkout" 
        />
        {isDirectOrder && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-center">
            <p className="font-medium">🎉 Quick Order Mode - Direct from Product!</p>
            <p className="text-sm mt-1">Your selected product has been added to cart and is ready for checkout.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 justify-center items-start mt-4 sm:mt-8">
        {/* Billing Details */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
            BILLING DETAILS
          </h2>
          <form ref={formRef} className="space-y-3 sm:space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">First name *</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company name (optional)</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country / Region *</label>
              <select className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all">
                <option>United States (US)</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Street address *</label>
              <input 
                type="text" 
                placeholder="House number and street name" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all mb-2"
              />
              <input 
                type="text" 
                placeholder="Apartment, suite, etc." 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Town / City *</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input 
                type="text" 
                defaultValue="Florida" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input 
                type="email" 
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 space-y-4 sm:space-y-6">
          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
              ADDITIONAL INFORMATION
            </h2>
            <textarea
              placeholder="Notes about your order. Like special notes for delivery."
              className="w-full h-32 p-4 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
            ></textarea>
          </div>

          {/* Cart Totals */}
          <div ref={totalsRef} className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
              ORDER SUMMARY
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-semibold text-gray-800">${totalFromCart}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium text-gray-700">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-bold text-lg text-gray-800">Total</span>
                <span className="font-bold text-lg text-gray-800">${totalFromCart}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mt-8 space-y-4">
              <h4 className="font-semibold text-gray-700 mb-3">PAYMENT METHOD</h4>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 transition-all">
                  <input type="radio" id="bank" name="payment" defaultChecked className="h-4 w-4 text-gray-600 focus:ring-gray-500" />
                  <label htmlFor="bank" className="ml-3 block text-sm font-medium text-gray-700">Direct bank transfer</label>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 transition-all">
                  <input type="radio" id="check" name="payment" className="h-4 w-4 text-gray-600 focus:ring-gray-500" />
                  <label htmlFor="check" className="ml-3 block text-sm font-medium text-gray-700">Check payments</label>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 transition-all">
                  <input type="radio" id="cod" name="payment" className="h-4 w-4 text-gray-600 focus:ring-gray-500" />
                  <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">Cash on delivery</label>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 transition-all">
                  <input type="radio" id="paypal" name="payment" className="h-4 w-4 text-gray-600 focus:ring-gray-500" />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
                </div>
              </div>
            </div>

            <button 
              ref={orderButtonRef}
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-[#FF6543] hover:bg-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl border-0 relative z-10"
              style={{ display: 'block', visibility: 'visible', opacity: 1 }}
            >
              PLACE ORDER
            </button>
            
            
            <div 
              ref={confirmationRef}
              className="mt-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-green-800 text-center opacity-0 transform translate-y-5 shadow-lg"
            >
              <div className="success-icon mb-3">
                <svg className="w-12 h-12 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-green-700">Order Placed Successfully!</h3>
              <p className="text-green-600">Your order has been placed successfully! We'll send a confirmation email shortly.</p>
              <p className="text-sm text-green-500 mt-2">Redirecting to home page...</p>
            </div>
          </div>
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

export default Checkout;