import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import LoadingScreen from "./components/layout/LoadingScreen";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoading ? (
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
