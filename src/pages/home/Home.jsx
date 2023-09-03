import { Helmet } from "react-helmet-async";
import AboutUs from "./AboutUs/AboutUs";
import Hero from "./Hero/Hero";
import PriceCard from "./PriceCard/PriceCard";
import Services from "./Services/Services";
import RecommendedRooms from "./RecommendedRooms/RecommendedRooms";
import Newsletter from "./Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Galaxies | Home</title>
        <meta property="og:title" content="A Hotel Where you found Peace" />
      </Helmet>
      <Hero />
      <AboutUs />
      <RecommendedRooms />
      <Services />
      <PriceCard />
      <Newsletter/>
    </div>
  );
};

export default Home;
