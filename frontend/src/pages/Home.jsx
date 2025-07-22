import Archive from "../components/layout/Archive";
import Hero from "../components/layout/Hero";
import HorizontalScrollSection from "../components/layout/HorizontalScrollSection";
import NewLaunched from "../components/layout/NewLaunched";
import ProductShowcaseSection from "../components/layout/ProductShowcaseSection";
import HomeCategoriesSection from "./HomeCategoriesSection";

export default function Home() {
  return (
    <main>
      <Hero />

      <HomeCategoriesSection />
      <NewLaunched />
      <ProductShowcaseSection />
      <HorizontalScrollSection/>
      <Archive/>
    </main>
  );
}
