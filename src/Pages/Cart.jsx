import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../Context/CartContext';
import { useGSAP } from '@gsap/react';
import PageHeader from "../Components/PageHeader";

const ShopLiteCart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
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
  }, []);

  const handleQuantityChange = (id, action) => {
    updateQuantity(id, action);

    const index = cartItems.findIndex((item) => item.id === id);
    const inputElement = itemsRef.current[index]?.querySelector('.quantity-input');
    if (inputElement) {
      gsap.fromTo(inputElement,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        }
      );
    }
  };

  const handleRemoveItem = (id) => {
    const index = cartItems.findIndex((item) => item.id === id);
    const itemElement = itemsRef.current[index];
    if (itemElement) {
      gsap.to(itemElement, {
        opacity: 0,
        x: -100,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => removeFromCart(id),
      });
    } else {
      removeFromCart(id);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader title="CART" previousPage="Shop" previousPageLink="/Shop" currentPage="Cart" />

      <div ref={cartRef} className="max-w-[100rem] mx-auto rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-6 mt-6 sm:mt-10">
          <div className="border-b border-gray-200 pb-6 sm:pb-10 mb-10 sm:mb-20">
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 font-medium text-gray-600 uppercase text-xl">
              <div className="col-span-5 md:col-span-4">Product</div>
              <div className="col-span-4 text-center">Quantity</div>
              <div className="col-span-3 text-right">Subtotal</div>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-gray-500">Start shopping to add items to your cart</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="cart-item grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 py-4 border-b border-gray-100"
                >
                  {/* Product Info */}
                  <div className="col-span-5 md:col-span-4 flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="relative items-center flex h-32 sm:h-[14rem] w-full sm:w-[12rem] flex-shrink-0 overflow-hidden rounded-md border border-gray-200 sm:mr-4 mb-4 sm:mb-0">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-full h-[8rem] object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-medium text-gray-900">{item.name}</h3>
                      <p className="text-orange-500 text-base sm:text-lg font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-4 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, 'dec')}
                        className="px-3 py-1 text-gray-600 border-gray-300 border rounded-sm hover:bg-gray-100 transition-colors"
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>

                      <span className="quantity-input w-12 text-center font-medium text-gray-800 m-4">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item.id, 'inc')}
                        className="px-3 py-1 text-gray-600 hover:bg-orange-400 hover:text-white border border-gray-300 rounded-sm transition-colors"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal and Remove */}
                  <div className="col-span-3 flex items-center justify-between sm:justify-end">
                    <p className="text-base sm:text-lg font-medium text-gray-900 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          <div ref={totalRef} className="p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-4">CART TOTAL</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between sm:gap-[12rem]">
                <span className="text-gray-600 text-xl sm:text-3xl">Subtotal</span>
                <span className="font-medium text-lg sm:text-xl">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between sm:gap-[15rem] pt-4 border-t border-gray-200">
                <span className="text-xl sm:text-3xl text-gray-600">Total</span>
                <span className="text-lg sm:text-xl font-bold text-orange-600">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-start   gap-4 sm:gap-6 mt-6 sm:mt-10">
              <button className="px-[] sm:w-auto bg-[#FF6543] hover:bg-orange-600 text-white font-medium py-3  sm:px-14 rounded-2xl flex items-center justify-center transition-colors">
                <FiArrowLeft className="mr-2" />
                Update Cart
              </button>
              <button className="w-full sm:w-auto bg-gray-300 text-black font-medium py-3 px-6 sm:px-14 rounded-2xl flex items-center justify-center transition-colors">
                <FiArrowLeft className="mr-2" />
                Continue Shopping
              </button>
              <button className="w-full sm:w-auto bg-[#FF6543] hover:bg-orange-700 text-white font-medium py-3 px-6 sm:px-14 rounded-2xl flex items-center justify-center transition-colors">
                <FiCreditCard className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLiteCart;
