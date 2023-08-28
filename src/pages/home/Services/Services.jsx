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
      id="services"
      className="h-[70vh] text-white "
      style={{
        backgroundImage: `url(${services?.bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "1.5rem",
      }}
    >
      
      <div className="w-full h-full pl-4 flex justify-around rounded-3xl items-center backdrop-brightness-50 flex-wrap">
        <motion.div
              variants={fadeIn("left", "tween", 0.5, 1)}
            >
        <div className="lg:w-2/5 w">
          <h2 className="text-3xl lg:text-5xl font-bold">{services?.title}</h2>
          <p className="mt-2">{services?.details}</p>
        </div>
        </motion.div> 
        <div>
          <motion.span
            className="primaryText"
            variants={fadeIn("right", "tween", 0.2, 1)}
          >
            <Card />
          </motion.span>
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
