import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const PageHeader = ({ title, currentPage, previousPage, previousPageLink }) => {
  const headerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(headerRef.current.querySelector("h1"), {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
    .from(headerRef.current.querySelector("p"), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5");
  }, []);

  return (
    <div ref={headerRef} className="w-full py-10 text-center mt-[5rem]">
      <h1 className="text-7xl font-light text-[#3f3f3f]">{title}</h1>
      <p className="mt-6 text-gray-600 text-xl">
        <Link to={previousPageLink} className="hover:text-[#FF6543] cursor-pointer">
          {previousPage}
        </Link> &gt;{" "}
        <span className="underline cursor-context-menu">{currentPage}</span>
      </p>
    </div>
  );
};

export default PageHeader;
