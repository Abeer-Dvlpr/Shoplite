import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaRegHeart, FaTimes, FaRegUser, FaSearch } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { gsap } from "gsap";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const menuRef = useRef();
  const containerRef = useRef();
  const Ls_searchRef = useRef();
  const Ss_searchRef = useRef();
  const logoRef = useRef();
  const iconRefs = useRef([]);

  useEffect(() => {
    if (searchOpen) {
      const target = window.innerWidth >= 1024 ? Ls_searchRef.current : Ss_searchRef.current;
      gsap.fromTo(
        target,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "sine" }
      );
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
      if (containerRef.current && !containerRef.current.contains(event.target)) setSearchOpen(false);
    };

    if (menuOpen || searchOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen, searchOpen]);

  // Logo Hover Animation
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const enter = () => gsap.to(logo, { scale: 1.15, rotate: 3, duration: 0.3, ease: "back.out(2)" });
    const leave = () => gsap.to(logo, { scale: 1, rotate: 0, duration: 0.3, ease: "back.out(2)" });

    logo.addEventListener("mouseenter", enter);
    logo.addEventListener("mouseleave", leave);

    return () => {
      logo.removeEventListener("mouseenter", enter);
      logo.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Icons Hover Animation
  useEffect(() => {
    iconRefs.current.forEach((icon) => {
      if (!icon) return;

      const enter = () => gsap.to(icon, { scale: 1.3, rotate: 5, duration: 0.25, ease: "back.out(2)" });
      const leave = () => gsap.to(icon, { scale: 1, rotate: 0, duration: 0.25, ease: "back.out(2)" });

      icon.addEventListener("mouseenter", enter);
      icon.addEventListener("mouseleave", leave);
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-9xl mx-auto px-4 flex justify-around items-center h-[4rem]">

        {/* Logo */}
        <Link to="/" ref={logoRef} className="text-[18px] font-semibold text-[#272727] xl:text-[28px] cursor-pointer">
          SHOP<span className="font-light">LITE</span>
        </Link>

        {/* Nav Links */}
        <ul className="hidden lg:flex space-x-8 font-medium text-[10px] text-[#272727] xl:text-[14px]">
          <li className="hover:text-[#FF6543]"><Link to="/">HOME</Link></li>
          <li className="hover:text-[#FF6543]"><Link to="/About">ABOUT</Link></li>
          <li className="hover:text-[#FF6543]"><Link to="/Shop">SHOP</Link></li>
          <li className="hover:text-[#FF6543]"><Link to="/Blog">BLOGS</Link></li>
          <li className="hover:text-[#FF6543]"><Link to="/Checkout">PAGES</Link></li>
          <li className="hover:text-[#FF6543]"><Link to="/Contact">CONTACT</Link></li>
        </ul>

        {/* Right Icons */}
        <ul className="hidden sm:flex space-x-8 text-[1rem] text-[#3a3a3a] items-center xl:text-[16px]">
          <li className="relative" ref={containerRef}>
            <FaSearch
              onClick={() => setSearchOpen(!searchOpen)}
              className="cursor-pointer"
              ref={(el) => (iconRefs.current[0] = el)}
            />
           { searchOpen && (
            <div ref={Ss_searchRef} className="flex absolute top-12 -right-60 w-80 p-2 items-center shadow-xl justify-center bg-white rounded rounded-b-2xl lg:hidden">
              <input type="text" placeholder="Search..." className="px-4 py-2 w-80 focus:outline-none rounded-l-md" />
              <button className="px-4 py-2 text-gray-700 rounded-r-md cursor-pointer">
                <FaSearch className="text-2xl hover:text-[#FF6543]" />
              </button>
            </div>
            )}

            {searchOpen && (
              <div ref={Ls_searchRef} className="hidden lg:flex absolute top-12 right-0 w-80 p-2 items-center shadow-xl justify-center bg-white rounded rounded-b-2xl">
                <input type="text" placeholder="Search..." className="px-4 py-2 w-80 focus:outline-none rounded-l-md" />
                <button className="px-4 py-2 text-gray-700 rounded-r-md cursor-pointer">
                  <FaSearch className="text-2xl hover:text-[#FF6543]" />
                </button>
              </div>
            )}
          </li>

          <li ref={(el) => (iconRefs.current[1] = el)} className="hover:text-[#FF6543]">
            <Link to="/Contact"><FaRegUser /></Link>
          </li>
          <li ref={(el) => (iconRefs.current[2] = el)} className="hover:text-[#FF6543]">
            <Link to="/wishlist"><FaRegHeart /></Link>
          </li>
          <li ref={(el) => (iconRefs.current[3] = el)} className="hover:text-[#FF6543] text-[1.3rem] xl:text-[1.5rem]">
            <Link to="/Cart"><RiShoppingCart2Line /></Link>
          </li>
        </ul>

        {/* Menu Button */}
        <div className="lg:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`fixed top-20 right-0 h-full w-64 bg-white shadow-xl transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50`}>
        <div className="flex justify-between items-center p-4 border-b text-[#3a3a3a]">
          <span className="text-xl font-bold text-[#272727]">Menu</span>
          <FaTimes className="text-xl cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>
        <ul className="flex flex-col gap-6 p-4 font-medium text-[#3a3a3a]">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link></li>
          <li><Link to="/shop" onClick={() => setMenuOpen(false)}>SHOP</Link></li>
          <li><Link to="/blog" onClick={() => setMenuOpen(false)}>BLOGS</Link></li>
          <li><Link to="/cart" onClick={() => setMenuOpen(false)}>CART</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
