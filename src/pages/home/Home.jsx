import { Helmet } from "react-helmet-async";
import AboutUs from "./AboutUs/AboutUs";
import Hero from "./Hero/Hero";
import PriceCard from "./PriceCard/PriceCard";
import Services from "./Services/Services";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Galaxies | Home</title>
        <meta property="og:title" content="A Hotel Where you found Peace" />
      </Helmet>
      <Hero />
      <AboutUs />
      <Services />
      <PriceCard />
    </div>
  );
};

export default Home;
