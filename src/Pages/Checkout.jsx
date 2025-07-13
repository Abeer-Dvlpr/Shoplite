import {  useRef } from 'react';
import { gsap } from 'gsap';
import PageHeader from "../Components/PageHeader";
import { useGSAP } from '@gsap/react';

const Checkout = () => {
  const formRef = useRef(null);
  const totalsRef = useRef(null);
  const headerRef = useRef(null);
  const orderButtonRef = useRef(null);
  const confirmationRef = useRef(null);

  useGSAP(() => {
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

    gsap.from(totalsRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.6,
      ease: "back.out(1.2)"
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
    
    // Show confirmation message
    gsap.to(confirmationRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 0.5,
      ease: "back.out(1.2)"
    });
    
    // Hide confirmation after 3 seconds
    setTimeout(() => {
      gsap.to(confirmationRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 lg:px-40">
      <div ref={headerRef}>
        <PageHeader 
          title="CHECKOUT" 
          previousPage="Shop" 
          previousPageLink="/Shop" 
          currentPage="Checkout" 
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start mt-8">
        {/* Billing Details */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            BILLING DETAILS
          </h2>
          <form ref={formRef} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Additional Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              ADDITIONAL INFORMATION
            </h2>
            <textarea
              placeholder="Notes about your order. Like special notes for delivery."
              className="w-full h-32 p-4 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border-gray-500 transition-all"
            ></textarea>
          </div>

          {/* Cart Totals */}
          <div ref={totalsRef} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              ORDER SUMMARY
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium text-gray-700">Subtotal</span>
                <span className="font-semibold text-gray-800">$2400.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium text-gray-700">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-bold text-lg text-gray-800">Total</span>
                <span className="font-bold text-lg text-gray-800">$2400.00</span>
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
              className="w-full mt-6 bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-900 transition-all transform hover:scale-[1.01] shadow-md hover:shadow-lg"
            >
              PLACE ORDER
            </button>

            {/* Order Confirmation */}
            <div 
              ref={confirmationRef}
              className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center opacity-0 transform translate-y-5"
            >
              <svg className="w-6 h-6 inline-block mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Your order has been placed successfully! We'll send a confirmation email shortly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;