import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Laptop from "../Images/CategoriesIMG/Laptop.png";
import Joysticks from "../Images/CategoriesIMG/Joysticks.png";
import Phone from "../Images/CategoriesIMG/Phone.png";
import Watch from "../Images/CategoriesIMG/Watch.png";
import AirPods from "../Images/CategoriesIMG/Airpods.png";

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
    const containerRef = useRef(null);

    const products = [
        { id: 1, Categories: "Laptop", price: "$870", image: Laptop },
        { id: 2, Categories: "Joysticks", price: "$600", image: Joysticks },
        { id: 3, Categories: "Phone", price: "$400", image: Phone },
        { id: 4, Categories: "Air Pods", price: "$2000", image: AirPods },
        { id: 5, Categories: "Watch", price: "$75", image: Watch },
    ];

    useGSAP(() => {
        const cards = containerRef.current.querySelectorAll(".card");

        gsap.from(cards, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power2.out",
        });
    }, []);

    return (
        <div className="relative max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-medium mb-6 text-[#4c4b4b] ">CATEGORIES</h2>

            <div
                ref={containerRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
                    >
                        <div className="w-full h-40 sm:h-48 md:h-56 flex justify-center items-center p-2">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-full object-contain"
                            />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold mb-2">{product.Categories}</h3>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
