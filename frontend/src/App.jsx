import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import LoadingScreen from "./components/layout/LoadingScreen";
import { startSmoothScroll } from "./utils/smoothScroll";

function App() {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsFullyLoaded(true);
      }, 3000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    startSmoothScroll();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {!isFullyLoaded ? (
        <LoadingScreen />
      ) : (
        <>
          <Navbar />
          <AppRouter />
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
