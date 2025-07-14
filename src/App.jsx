import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import ShopLiteCart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Product/:id" element={<ProductPage />} />
        <Route path="/Cart" element={<ShopLiteCart />}/>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </>
  );
}

export default App;
