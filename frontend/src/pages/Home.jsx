import Hero from "../components/layout/Hero";
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
    </main>
  );
}
