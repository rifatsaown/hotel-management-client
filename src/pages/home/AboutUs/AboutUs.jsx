import { useContext } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { InfoContext } from "../../../provider/InfoProvider";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../shared/motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const { aboutUs } = useContext(InfoContext);
  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="max-w-screen-2xl mx-auto"
      >
      <div className="lg:flex">
        <div className="grid items-center lg:w-1/2 lg:order-last">
        <motion.span
              className="secondaryText"
              variants={fadeIn("up", "tween", 0.4, 1)}
            >
          <div className="pl-4">
            <h3 className="text-lg uppercase mb-4 text-slate-500">
              {aboutUs?.subHeading}
            </h3>
            <h1 className="lg:text-7xl text-4xl font-bold">
              {aboutUs?.heading}
            </h1>
            <p className="mt-2">{aboutUs?.content}</p>
            <Link to='/about' className="btn btn-wide btn-primary mt-4">
              About us <BsInfoCircle/>
            </Link>
          </div>
          </motion.span>
        </div>
        <div >
        <motion.span
              className="primaryText"
              variants={fadeIn("Down", "tween", 0.2, 1)}
            >
          <div className="lg:w-1/2 lg:ml-20 p-4 ">
            <img className="rounded-xl" src={aboutUs?.bannerImg1} alt="" />
          </div>
          <div className="lg:w-1/2 lg:-mt-48">
            <img className="rounded-xl rounded-s-3xl" src={aboutUs?.bannerImg2} alt="" />
          </div>
          </motion.span>
        </div>
      </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
