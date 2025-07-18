import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "../components/layout/ScrollToTop"; 

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const About = lazy(() => import("../pages/About"));
const Archive = lazy(() => import("../pages/Archive"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRouter() {
  return (
    <>
      <ScrollToTop /> 
      <Suspense
        fallback={
          <div className="text-center py-20 text-gray-500">Loading page...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
