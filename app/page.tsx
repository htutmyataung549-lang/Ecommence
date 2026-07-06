import Image from "next/image";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import PreFooter from "./components/PreFooter";
import BrandAndInstagram from "./components/BrandAndInstagram";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      {/* <CategoryList /> */}
      <ProductList />
      <BrandAndInstagram/>
      <PreFooter/>
    </div>
  );
}
