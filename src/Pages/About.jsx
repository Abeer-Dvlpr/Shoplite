import BrandsSlider from "../Components/BrandsSlider";
import CustomerReview from "../Components/CustomerReview";
import Footer from "../Components/Footer";
import LatestPosts from "../Components/LatestPost";
import PageHeader from "../Components/PageHeader";
import Services from "../Components/Services";
import AboutSection from "../Components/AboutSection";
import AppleShowcase from "../Components/Apple";


function About() {
  return (
    <>
      <PageHeader title="ABOUT US" previousPage="HOME" previousPageLink="/" currentPage="ABOUT" />
      <div className="mt-[5rem]">
        <Services />
      </div>
      <AboutSection />
      <div className="mt-[5rem] mb-[5rem]">
        <CustomerReview />
      </div>
      <LatestPosts />
      <div className="mt-[5rem] mb-[5rem]">
        <BrandsSlider />
      </div>

      <AppleShowcase />

      <Footer />
    </>
  );
}

export default About;
