import {  useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Headphone from "../Images/ListsItemIMG/Headphone.png";
import Iphone from "../Images/ListsItemIMG/Iphone x.png";
import Phone from "../Images/ListsItemIMG/Phone.png";
import Airpod from "../Images/ListsItemIMG/Airpod.png";
import CCTVCamera from "../Images/ListsItemIMG/CCTV.png";
import Digitalwatch from "../Images/ListsItemIMG/Digitalwatch.png";
import Iphone15 from "../Images/ListsItemIMG/Iphone15.png";
import Joystcks from "../Images/ListsItemIMG/Joysticks.png";
import Pad from "../Images/ListsItemIMG/Pad.png";
import Vlogingstand from "../Images/ListsItemIMG/Vlogingstand.png";
import Watch from "../Images/ListsItemIMG/Watch.png";
import Whitepods from "../Images/ListsItemIMG/Whitepods.png";

gsap.registerPlugin(ScrollTrigger);

const ListsItem = () => {
  const containerRef = useRef(null);

  const data = [
    {
      title: "FEATURED",
      products: [
        { id: 1, name: "Wireless Headset", price: "$500", image: Headphone },
        { id: 2, name: "Iphone X Pro Max", price: "$820", image: Iphone },
        { id: 3, name: "Smart Phone", price: "$660", image: Phone },
      ],
    },
    {
      title: "LATEST ITEMS",
      products: [
        { id: 4, name: "Bluetooth Earbuds", price: "$120", image: Airpod },
        { id: 5, name: "Gaming Console", price: "$950", image: Joystcks },
        { id: 6, name: "4K Smart TV", price: "$2000", image: Pad },
      ],
    },
    {
      title: "BEST REVIEWED",
      products: [
        { id: 7, name: "Best CCTV Camera", price: "$700", image: CCTVCamera },
        { id: 8, name: "iPhone 15 Pro", price: "$1100", image: Iphone15 },
        { id: 9, name: "Latest Digital Watch", price: "$850", image: Digitalwatch },
      ],
    },
    {
      title: "ON SALE",
      products: [
        { id: 10, name: "Best Apple White Pods", price: "$1100", image: Whitepods },
        { id: 11, name: "Noise Cancelling Headphones", price: "$700", image: Watch },
        { id: 12, name: "Latest Vloging Stand", price: "$850", image: Vlogingstand },
      ],
    },
  ];

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll(".product-card");

    gsap.from(cards, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={containerRef} className="flex flex-wrap gap-8 max-w-9xl mx-auto p-4 justify-center">
      {data.map((section, index) => (
        <div key={index} className="p-4 w-full sm:w-[300px] flex-shrink-0">

          <h1 className="text-2xl font-semibold mb-4 text-center sm:text-left">{section.title}</h1>

          <div className="flex flex-col gap-4">
            {section.products.map((product) => (
              <div key={product.id} className="product-card flex items-center p-4 bg-white shadow-lg rounded-lg">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-contain" />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-[#FF6543] font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default ListsItem;
