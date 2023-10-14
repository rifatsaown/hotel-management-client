import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../../shared/motion";
import { Link } from "react-router-dom";

const RecommendedRooms = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="findBestValue"
      className="hero min-h-[70vh] my-4"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/hsnyz0W/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg)",
        borderRadius: "1rem",
      }}
    >
      <div className="p-8">
        <h2 className="text-4xl text-center font-semibold mb-4 backdrop-blur-3xl py-3 rounded-full text-white">
          Most Recommended Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Room 1 */}
          <motion.div variants={fadeIn("up", "tween", 0.5, 1)}>
            <div className="bg-gray-400 rounded-lg shadow-md p-6">
              <img
                src="http://parador-react.wpocean.com/product/1.jpg" // Replace with an actual image URL
                alt="Room 1"
                className="w-full h-40 object-cover rounded-md mb-4 hover:opacity-80 transition duration-150 ease-in-out"
              />
              <h3 className="text-xl font-semibold mb-2">Deluxe Suite</h3>
              <p className="text-gray-600 mb-4">
                Luxurious suite with a view of the city.
              </p>
              <ul className="list-disc list-inside">
                <li>King-size bed</li>
                <li>City view balcony</li>
                <li>Spa and fitness center access</li>
              </ul>
              <Link to='/rooms' className="btn btn-primary mt-4 w-full">Book Now</Link>
            </div>
          </motion.div>
          {/* Room 2 */}
          <motion.div variants={fadeIn("up", "tween", 0.5, 1)}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src="http://parador-react.wpocean.com/product/2.jpg" // Replace with an actual image URL
                alt="Room 2"
                className="w-full h-40 object-cover rounded-md mb-4 hover:opacity-80 transition duration-150 ease-in-out"
              />
              <h3 className="text-xl font-semibold mb-2">Luxury Villa</h3>
              <p className="text-gray-600 mb-4">
                Private villa with a beachfront view.
              </p>
              <ul className="list-disc list-inside">
                <li>Private beach access</li>
                <li>Private pool</li>
                <li>Personal chef available</li>
              </ul>
              <Link to='/rooms' className="btn btn-primary mt-4 w-full">Book Now</Link>
            </div>
          </motion.div>
          {/* Room 3 */}
          <motion.div variants={fadeIn("up", "tween", 0.5, 1)}>
            <div className="bg-gray-400 rounded-lg shadow-md p-6">
              <img
                src="http://parador-react.wpocean.com/product/3.jpg" // Replace with an actual image URL
                alt="Room 3"
                className="w-full h-40 object-cover rounded-md mb-4 hover:opacity-80 transition duration-150 ease-in-out"
              />
              <h3 className="text-xl font-semibold mb-2">Standard Room</h3>
              <p className="text-gray-600 mb-4">
                Comfortable room with all basic amenities.
              </p>
              <ul className="list-disc list-inside">
                <li>Queen-size bed</li>
                <li>City view</li>
                <li>Free Wi-Fi</li>
              </ul>
              <Link to='/rooms' className="btn btn-primary mt-4 w-full">Book Now</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default RecommendedRooms;
