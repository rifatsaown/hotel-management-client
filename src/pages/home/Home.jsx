import { Helmet } from "react-helmet-async";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Galaxies | Home</title>
        <meta property="og:title" content="A Hotel Where you found Peace"/>
      </Helmet>
      <Hero />
    </div>
  );
};

export default Home;
