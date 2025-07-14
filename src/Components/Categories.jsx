import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
    const containerRef = useRef(null);

    const products = [
        { id: 1, Categories: "Laptop", price: "$870", image: "/Images/CategoriesIMG/Laptop.png" },
        { id: 2, Categories: "Joysticks", price: "$600", image: "/Images/CategoriesIMG/Joysticks.png" },
        { id: 3, Categories: "Phone", price: "$400", image: "/Images/CategoriesIMG/Phone.png" },
        { id: 4, Categories: "Air Pods", price: "$2000", image: "/Images/CategoriesIMG/Airpods.png" },
        { id: 5, Categories: "Watch", price: "$75", image: "/Images/CategoriesIMG/Watch.png" },
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
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
                    >
                        <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 flex justify-center items-center p-2">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-h-full object-contain product-image"
                            />
                        </div>
                        <div className="p-3 sm:p-4 text-center">
                            <h3 className="text-base sm:text-lg font-semibold mb-2">{product.Categories}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
