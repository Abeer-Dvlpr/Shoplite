import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { FiShoppingCart, FiX, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../Context/CartContext';
import { useGSAP } from '@gsap/react';
import PageHeader from "../Components/PageHeader";
import { Link, useNavigate } from 'react-router-dom';
import CustomerReview from '../Components/CustomerReview';
import BrandsSlider from '../Components/BrandsSlider';
import AppleShowcase from '../Components/Apple';
import Footer from '../Components/Footer';

const ShopLiteCart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const cartRef = useRef(null);
  const itemsRef = useRef([]);
  const totalRef = useRef(null);

  useGSAP(() => {
    gsap.from(cartRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from(itemsRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.3,
      ease: 'back.out',
    });

    gsap.from(totalRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: 0.8,
      ease: 'power2.out',
    });
  });

  const handleQuantityChange = (id, action) => {
    updateQuantity(id, action);
    
    const index = cartItems.findIndex(item => item.id === id);
    const quantityElement = itemsRef.current[index]?.querySelector('.quantity-value');
    
    if (quantityElement) {
      gsap.fromTo(quantityElement,
        { scale: 1.2 },
        { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  const handleRemoveItem = (id) => {
    const index = cartItems.findIndex(item => item.id === id);
    const itemElement = itemsRef.current[index];
    
    if (itemElement) {
      gsap.to(itemElement, {
        opacity: 0,
        x: -100,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => removeFromCart(id)
      });
    } else {
      removeFromCart(id);
    }
  };

  const handleCheckout = () => {
    const total = getCartTotal();
    navigate(`/checkout?total=${total.toFixed(2)}`);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <PageHeader 
          title="Shopping Cart"
          previousPage="Shop" 
          previousPageLink="/shop"
          currentPage="Cart"
        />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-center">Add some items to your cart and they will appear here.</p>
          <Link 
            to="/shop" 
            className="bg-[#FF6543] text-white px-8 py-3 rounded-lg hover:bg-[#ff4f29] transition-colors text-center w-full max-w-xs"
          >
            Continue Shopping
          </Link>
        </div>
        <CustomerReview />
        <BrandsSlider />
        <AppleShowcase />
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageHeader 
        title="Shopping Cart"
        previousPage="Shop" 
        previousPageLink="/shop"
        currentPage="Cart"
      />
      <div ref={cartRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">Shopping Cart ({cartItems.length})</h2>
          
          {/* Mobile view - stacked layout */}
          <div className="sm:hidden space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemsRef.current[index] = el}
                className="flex flex-col gap-4 pb-6 border-b last:border-0"
              >
                <div className="flex gap-4">
                  <img
                    src={item.IMG || item.images?.[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                    <p className="text-[#FF6543] font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, 'dec')}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="quantity-value w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 'inc')}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <FiX size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop view - table layout */}
          <div className="hidden sm:block space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemsRef.current[index] = el}
                className="flex items-center gap-6 pb-6 border-b last:border-0"
              >
                <img
                  src={item.IMG || item.images?.[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-[#FF6543] font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                  <button
                    onClick={() => handleQuantityChange(item.id, 'dec')}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <FiMinus />
                  </button>
                  <span className="quantity-value w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 'inc')}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={totalRef} className="mt-6 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Cart Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-[#FF6543]">${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-[#FF6543] text-white py-3 rounded-lg hover:bg-[#ff4f29] transition-colors font-medium"
          >
            Proceed to Checkout
          </button>
          <Link 
            to="/shop" 
            className="block w-full mt-3 text-center bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <CustomerReview />
      <BrandsSlider />
      <AppleShowcase />
      <Footer />
    </>
  );
};

export default ShopLiteCart;