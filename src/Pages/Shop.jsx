import CategoriesSidebar from "../Components/CategoriesSide";
import PageHeader from "../Components/PageHeader";
import ProductsGrid from "../Components/ProductsGrid";
import CustomerReview from "../Components/CustomerReview";
import BrandsSlider from "../Components/BrandsSlider";
import LatestPosts from "../Components/LatestPost";
import AppleShowcase from "../Components/Apple";
import Footer from "../Components/Footer";


function Shop() {


  return (
    <>
      <PageHeader title="SHOP" previousPage="ABOUT US" previousPageLink="/about" currentPage="SHOP" className="mt-[5rem]"/>

      <div className="flex flex-col lg:flex-row gap-10 p-6 max-w-8xl mx-auto">
        <CategoriesSidebar />
        <div className="flex-1">
        <ProductsGrid  />
        </div>
      </div>
      <div className="mt-[10rem] mb-[5rem]">
        <CustomerReview />
      </div>

      <LatestPosts />
      <div className="mt-[5rem] mb-[5rem]">
        <BrandsSlider />
      </div>

      <AppleShowcase />

      <Footer/>
    </>
  );
}

export default Shop;