import { Helmet } from "react-helmet-async";
import Hero from "./Hero/Hero";
import AboutUs from "./AboutUs/AboutUs";
import Services from "./Services/Services";

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
    </div>
  );
};

export default Home;
