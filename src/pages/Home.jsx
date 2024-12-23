import Header from "../component/HomePage components/Header";
import HeroSection from "../component/HomePage components/HeroSection";
import NewArrivals from "../component/HomePage components/NewArrival";
import AboutUs from "../component/HomePage components/AboutUs";
import Footer from "../component/HomePage components/Footer";
import Shop from "./Shop";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <NewArrivals />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
