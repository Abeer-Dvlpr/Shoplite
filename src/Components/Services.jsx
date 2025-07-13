import { useRef } from "react";
import { RiShoppingCart2Line, RiTrophyLine, RiPriceTagLine, RiSecurePaymentLine } from "react-icons/ri";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const servicesRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".service-card");

        gsap.from(cards, {
            scrollTrigger: {
                trigger: servicesRef.current,
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
        <div ref={servicesRef} className="justify-center gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            
            <div className="service-card flex flex-col sm:flex-row gap-4 md:gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="p-3">
                        <RiShoppingCart2Line className="text-3xl text-[#FF6543]" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="font-semibold text-xl md:text-2xl text-[#3a3a3a] mb-2">FREE DELIVERY</h1>
                    <p className="text-gray-600 text-sm md:text-base">Enjoy free delivery on all orders over $50. Fast and reliable shipping to your doorstep.</p>
                </div>
            </div>

            <div className="service-card flex flex-col sm:flex-row gap-4 md:gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="p-3">
                        <RiTrophyLine className="text-3xl text-[#FF6543]" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="font-semibold text-xl md:text-2xl text-[#3a3a3a] mb-2">Quality guarantee</h1>
                    <p className="text-gray-600 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem expedita vitae eaque delectus</p>
                </div>
            </div>

            <div className="service-card flex flex-col sm:flex-row gap-4 md:gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="p-3">
                        <RiPriceTagLine className="text-3xl text-[#FF6543]" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="font-semibold text-xl md:text-2xl text-[#3a3a3a] mb-2">Daily offers</h1>
                    <p className="text-gray-600 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, fugit.</p>
                </div>
            </div>

            <div className="service-card flex flex-col sm:flex-row gap-4 md:gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <div className="p-3">
                        <RiSecurePaymentLine className="text-3xl text-[#FF6543]" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="font-semibold text-xl md:text-2xl text-[#3a3a3a] mb-2">100% secure payment</h1>
                    <p className="text-gray-600 text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat.</p>
                </div>
            </div>
            
        </div>
    );
};

export default Services;
