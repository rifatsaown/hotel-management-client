import { Helmet } from "react-helmet-async";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs/AboutUs";
import Services from "./Services/Services";
import PriceCard from "./PriceCard/PriceCard";
import ContactFrom from "./ContactFrom/ContactFrom";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Galaxies | Home</title>
        <meta property="og:title" content="A Hotel Where you found Peace"/>
      </Helmet>
      <Hero />
      <AboutUs/>
      <Services/>
      <PriceCard/>
      <ContactFrom/>
    </div>
  );
};

export default Home;
