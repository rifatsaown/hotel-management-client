import { motion } from "framer-motion";
import { useContext } from "react";
import { InfoContext } from "../../../provider/InfoProvider";
import { fadeIn, staggerContainer } from "../../shared/motion";
import Card from "./Card";

const Services = () => {
  const { services } = useContext(InfoContext);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="h-[70vh]"
      style={{
        backgroundImage: `url(${services?.bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "1.5rem",
      }}
    >
      <div className="w-full h-full pl-4 rounded-3xl grid items-center">
        <motion.div className="flex justify-center" variants={fadeIn("up", "tween", 0.5, 1)}>
          <div className="text-center lg:w-2/6 backdrop-blur-lg p-2 rounded-3xl">
            <h2 className="text-3xl lg:text-5xl font-bold ">
              {services?.title}
            </h2>
            <p className="mt-2 ">{services?.details}</p>
          </div>
        </motion.div>
        <motion.div
          className=" justify-center"
          variants={fadeIn("Down", "tween", 0.2, 1)}
        >
          <Card />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
