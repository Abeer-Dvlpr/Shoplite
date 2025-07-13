import HeroSlider from "../Components/HeroSlider";
import Services from "../Components/Services";
import ProductSlider from "../Components/ProdutSlider";
import Categories from "../Components/Categories";
import AppleSaleBanner from "../Components/SaleBannner";
import ListsItem from "../Components/ListsItem";
import CustomerReview from "../Components/CustomerReview";
import LatestPosts from "../Components/LatestPost";
import BrandsSlider from "../Components/BrandsSlider";
import Footer from "../Components/Footer";
import AppleShowcase from "../Components/Apple";



function Home() {
  return (
    <>
      <div className="mb-[5rem]">
        <HeroSlider />
      </div>
      <Services />
      <div className="mt-[5rem] mb-[5rem]">
        <Categories />
      </div>
      <ProductSlider />
      <div className="mt-[5rem] mb-[5rem]">
        <AppleSaleBanner />
      </div>
      <ListsItem />
      <div className="mt-[5rem] mb-[5rem]">
        <CustomerReview />
      </div>
      <LatestPosts />
      <div className="mt-[5rem] mb-[5rem]">
       <BrandsSlider/>
      </div>
      
      <AppleShowcase/>
    
        <Footer/>
    </>
  );
}

export default Home;
