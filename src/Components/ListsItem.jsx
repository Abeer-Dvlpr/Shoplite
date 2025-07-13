import {  useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ListsItem = () => {
  const containerRef = useRef(null);

  const data = [
    {
      title: "FEATURED",
      products: [
        { id: 1, name: "Wireless Headset", price: "$500", image: "/Images/ListsItemIMG/Headphone.png" },
        { id: 2, name: "Iphone X Pro Max", price: "$820", image: "/Images/ListsItemIMG/Iphone x.png" },
        { id: 3, name: "Smart Phone", price: "$660", image: "/Images/ListsItemIMG/Phone.png" },
      ],
    },
    {
      title: "LATEST ITEMS",
      products: [
        { id: 4, name: "Bluetooth Earbuds", price: "$120", image: "/Images/ListsItemIMG/Airpod.png" },
        { id: 5, name: "Gaming Console", price: "$950", image: "/Images/ListsItemIMG/Joysticks.png" },
        { id: 6, name: "4K Smart TV", price: "$2000", image: "/Images/ListsItemIMG/Pad.png" },
      ],
    },
    {
      title: "BEST REVIEWED",
      products: [
        { id: 7, name: "Best CCTV Camera", price: "$700", image: "/Images/ListsItemIMG/CCTV.png" },
        { id: 8, name: "iPhone 15 Pro", price: "$1100", image: "/Images/ListsItemIMG/Iphone15.png" },
        { id: 9, name: "Latest Digital Watch", price: "$850", image: "/Images/ListsItemIMG/Digitalwatch.png" },
      ],
    },
    {
      title: "ON SALE",
      products: [
        { id: 10, name: "Best Apple White Pods", price: "$1100", image: "/Images/ListsItemIMG/Whitepods.png" },
        { id: 11, name: "Noise Cancelling Headphones", price: "$700", image: "/Images/ListsItemIMG/Watch.png" },
        { id: 12, name: "Latest Vloging Stand", price: "$850", image: "/Images/ListsItemIMG/Vlogingstand.png" },
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
