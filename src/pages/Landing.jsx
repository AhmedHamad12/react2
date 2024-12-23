import RegisterForm from "../component/auth/rigsterform";
import FeaturesSection from "../component/Home components/FeaturesSection";
import Footer from "../component/Home components/Footer";
import Header from "../component/Home components/Header";
import HeroSection from "../component/Home components/HeroSection";
import SummerSale from "../component/Home components/SummerSale";
import TrendingProducts from "../component/Home components/TrendingProducts";




const Landing = () => {
  return (
      <div className="app">
        <Header />
      <div className="container">
        <HeroSection/>
        <FeaturesSection />
        <TrendingProducts />
        <SummerSale />
        <Footer />

      </div>
    </div>
  );
};

export default Landing;
