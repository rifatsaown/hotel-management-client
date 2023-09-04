import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn, staggerChildren, textVariant } from "../../shared/motion";

const PriceCard = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="findBestValue"
      className="hero min-h-[70vh] mt-4"
      style={{
        backgroundImage: "url(https://i.ibb.co/54wMZXV/parallax18.jpg)",
        borderRadius: "1rem",
      }}
    >
      <div className="hero-overlay bg-opacity-60  rounded-2xl"></div>
      <div>
        <motion.div variants={textVariant(0.4)} className={`text-center `}>
          <h2 className="text-3xl font-bold mt-2 backdrop-blur-3xl py-3 rounded-full">
            Find Best Value
          </h2>
        </motion.div>
        <div className="lg:flex gap-3 space-y-3 mx-8 my-8 text-center flex-wrap">
          <motion.div
            variants={fadeIn("down", "tween", 0.7, 0.6)}
            className="card lg:w-96 backdrop-blur-3xl mt-3 hover:-translate-y-4 hover:transition-all"
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold">Standard Room</h2>
              <p className="font-semibold">
                $ <span className="text-4xl font-extrabold">40</span> /night
              </p>
              <ul className="space-y-2 ml-5 text-left my-4">
                <li>A high-speed internet connection </li>
                <li>A smart TV with access to streaming services</li>
                <li>A minibar with snacks and drinks</li>
                <li>A Nespresso coffee machine</li>
                <li>A private balcony with stunning views of the city</li>
              </ul>
              <div className="card-actions justify-center mt-2">
                <Link to="/rooms" className="btn btn-primary">
                  more info
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "tween", 0.7, 0.6)}
            className="card lg:w-96 glass hover:-translate-y-4 hover:transition-all"
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold">Deluxe Room</h2>
              <p className="font-semibold">
                $ <span className="text-4xl font-extrabold">55</span> /night
              </p>
              <ul className="space-y-2 ml-5 text-left my-4">
                <li className="font-semibold">
                  All of the amenities in the standard room, plus:{" "}
                </li>
                <li>A rain shower</li>
                <li>A welcome basket of fruit and pastries</li>
                <li>A turndown service</li>
              </ul>
              <div className="card-actions justify-center mt-2">
                <Link to="/rooms" className="btn btn-primary">
                  more info
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("down", "tween", 0.7, 0.6)}
            className="card lg:w-96 backdrop-blur-3xl hover:-translate-y-4 hover:transition-all"
          >
            <div className="card-body">
              <h2 className="text-2xl font-semibold">Suite</h2>
              <p className="font-semibold">
                $ <span className="text-4xl font-extrabold">74</span> /night
              </p>
              <ul className="space-y-2 ml-5 text-left my-4">
                <li className="font-semibold">
                  All of the amenities in the deluxe room, plus:{" "}
                </li>
                <li>A spacious living area</li>
                <li>A separate bedroom</li>
                <li>A walk-in closet</li>
                <li>A walk-in closet</li>
              </ul>
              <div className="card-actions justify-center mt-2">
                <Link to="/rooms" className="btn btn-primary">
                  more info
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PriceCard;
