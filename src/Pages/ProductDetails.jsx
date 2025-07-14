import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiMinus, FiPlus, FiStar, FiChevronRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCart } from "../Context/CartContext";
import products from '../Data/Shop.js';
import PageHeader from '../Components/PageHeader';
import CustomerReview from '../Components/CustomerReview.jsx';
import BrandsSlider from '../Components/BrandsSlider.jsx';
import AppleShowcase from '../Components/Apple.jsx';
import Footer from '../Components/Footer.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div>❌ Product not found!</div>;
  }

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const imageRefs = useRef([]);
  const wishlistBtnRef = useRef(null);
  const cartBtnRef = useRef(null);
  const orderBtnRef = useRef(null);
  const productSectionRef = useRef(null);
  const detailsRef = useRef(null);
  const tabsRef = useRef(null);

  useGSAP(() => {
    gsap.from(productSectionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.2
    });
    gsap.from(detailsRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.5,
      delay: 0.4
    });
    gsap.from(tabsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.6
    });
  }, []);

  const handleQuantity = (type) => {
    if (type === 'inc') setQuantity(q => q + 1);
    else if (quantity > 1) setQuantity(q => q - 1);

    gsap.to(".quantity-number", {
      scale: type === 'inc' ? 1.2 : 0.8,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    };
    addToCart(productToAdd);
    animateCart();
  };

  const handleOrderNow = () => {
    handleAddToCart();
    navigate('/checkout');
    rippleOrder();
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    gsap.from(".tab-content", { opacity: 0, y: 20, duration: 0.4, ease: "power2.out" });
  };

  const toggleWishlist = () => {
    setWishlisted(w => !w);
    gsap.to(wishlistBtnRef.current, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" });
  };

  const animateCart = () => {
    gsap.to(cartBtnRef.current, {
      scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out",
      onComplete: () => gsap.to(".cart-icon", { x: 5, duration: 0.1, yoyo: true, repeat: 3 })
    });
  };

  const rippleOrder = () => {
    const r = document.createElement("span");
    r.className = "absolute bg-white rounded-full animate-ripple";
    orderBtnRef.current.appendChild(r);
    setTimeout(() => { r.remove(); }, 1000);
  };

  const addToImageRefs = (el, i) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current[i] = el;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={product.name}
        previousPage="Shop"
        previousPageLink="/shop"
        currentPage="Product Details"
      />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Remove old breadcrumb since it's now in PageHeader */}
          
          {/* Images + Info */}
          <div ref={productSectionRef} className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="w-full md:w-1/2 flex gap-4">
              <div className="hidden md:flex flex-col gap-4">
                {product.images.map((img, i) => (
                  <div key={i} onClick={() => setActiveImage(i)}
                    className={`w-40 h-40 rounded-xl cursor-pointer overflow-hidden border-2 ${activeImage === i ? 'border-[#FF6543]' : 'border-transparent'}`}>
                    <img ref={el => addToImageRefs(el, i)} src={img} alt={`${product.name} ${i}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
                <img ref={el => addToImageRefs(el, product.images.length)} src={product.images[activeImage]} alt={product.name} className="object-contain p-8 w-full h-full" />
              </div>
            </div>

            <div ref={detailsRef} className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-[#FF6543]">${product.price.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500">+ Free Shipping</span>
              </div>
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_,i) => <FiStar key={i} className="w-5 h-5 text-[#FF6543]" />)}
                <span className="ml-2 text-sm text-gray-500">({product.reviews?.length || 0} reviews)</span>
              </div>
              <p className="text-gray-600 mb-8">{product.description}</p>

              {/* Color & Size */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors?.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedColor===color?'bg-red-100 text-red-800':'bg-gray-100'}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex gap-2">
                  {product.sizes?.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedSize===s?'bg-red-100 text-red-800':'bg-gray-100'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <p className={`mb-6 text-sm ${product.stock<3?'text-red-600':'text-gray-500'}`}>
                {product.stock<3 ? `Only ${product.stock} left!` : 'In stock'}
              </p>

              <div className="flex items-center mb-8">
                <button onClick={() => handleQuantity('dec')} className="px-3 py-2 bg-gray-200 rounded-l-md">
                  <FiMinus/>
                </button>
                <span className="quantity-number px-4 py-2 bg-gray-100">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="px-3 py-2 bg-gray-200 rounded-r-md">
                  <FiPlus/>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button ref={orderBtnRef} onClick={handleOrderNow} className="relative flex-1 bg-[#FF6543] text-white py-3 rounded-2xl flex items-center justify-center gap-2 overflow-hidden">
                  <FiShoppingCart className="cart-icon" /> ORDER NOW
                </button>
                <button ref={cartBtnRef} onClick={handleAddToCart} className="flex-1 bg-gray-900 text-white py-3 rounded-2xl">
                  ADD TO CART
                </button>
                <button ref={wishlistBtnRef} onClick={toggleWishlist} className={`p-3 border rounded-2xl ${wishlisted?'text-[#FF6543] border-[#FF6543]':'text-gray-600 border-gray-300'}`}>
                  <FiHeart className={wishlisted?'fill-current':''} />
                </button>
              </div>

              <div className="border-t pt-6 text-sm grid grid-cols-2 gap-4">
                <div><span className="text-gray-500">SKU:</span> <span>{product.sku}</span></div>
                <div><span className="text-gray-500">Category:</span> <span>{product.category}</span></div>
                <div><span className="text-gray-500">Tags:</span> <span>{product.tags?.join(', ') || ''}</span></div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div ref={tabsRef} className="mb-12">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['description','additional','reviews'].map(tab => (
                  <button key={tab} onClick={() => changeTab(tab)}
                    className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab===tab?'border-[#FF6543] text-[#FF6543]':'border-transparent text-gray-700'}`}>
                    {tab==='description'?'Description':tab==='additional'?'Specifications':`Reviews (${product.reviews?.length || 0})`}
                  </button>
                ))}
              </nav>
            </div>
            <div className="tab-content mt-8">
              {activeTab==='description' && <p className="text-gray-600">{product.description}</p>}
              {activeTab==='additional' && (
                <div className="grid grid-cols-2 gap-6 text-gray-600">
                  {Object.entries(product.additional_information || {}).map(([k,v]) => (
                    <p key={k}><strong>{k}:</strong> {v}</p>
                  ))}
                </div>
              )}
              {activeTab==='reviews' && product.reviews?.map((r,i) => (
                <div key={i} className="border-b py-4 last:border-0">
                  <div className="flex items-center">
                    <img src={r.image} alt={r.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <strong>{r.name}</strong> 
                      <div className="flex">
                        {[...Array(r.rating)].map((_,x) => <FiStar key={x} className="text-[#FF6543]" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{r.date}</p>
                  <p className="mt-2">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple { 
          to { 
            transform: scale(4); 
            opacity: 0; 
          } 
        }
        .animate-ripple { 
          animation: ripple 0.6s linear; 
          width: 20px; 
          height: 20px; 
          position: absolute; 
          opacity: 0.6; 
          background: white; 
          border-radius: 50%; 
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
            <CustomerReview />
      <BrandsSlider />
      <AppleShowcase />
      <Footer />
    </div>
  );
};

export default ProductDetails;