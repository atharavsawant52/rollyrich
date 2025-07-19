import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const About = lazy(() => import("../pages/About"));
const Archive = lazy(() => import("../pages/Archive"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const Cart = lazy(() => import("../pages/Cart"));
const NotFound = lazy(() => import("../pages/NotFound"));

function AppRouter() {
  const user = useSelector((state) => state.auth.user);

  const RequireAuth = ({ children }) =>
    user ? children : <Navigate to="/login" />;

  const RequireAdmin = ({ children }) =>
    user?.role === "admin" ? children : <Navigate to="/" />;

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/archive" element={<Archive />} />

        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
