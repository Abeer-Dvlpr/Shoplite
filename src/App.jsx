import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductDetails";
import Checkout from "./Pages/Checkout";
import ShopLiteCart from "./Pages/Cart";
import Contact from "./Pages/Contact";


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
      </Routes>

    </>
  );
}

export default App;
