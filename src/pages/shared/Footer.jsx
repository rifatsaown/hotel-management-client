import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from "framer-motion";
import { footerVariants, staggerChildren } from './motion';

const Footer = () => {
  return (
    <motion.footer
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="bg-secondary bg-opacity-50 py-6"
    >
      <motion.div
        variants={footerVariants}
      >
      <div className="container mx-auto flex justify-around items-center">
        <div className="text-lg font-semibold ">Galaxies Hotel</div>
        <div className="flex">
          <a href="#" className="hover:text-blue-600 mx-2"><FaFacebook /></a>
          <a href="#" className="hover:text-blue-500 mx-2"><FaTwitter /></a>
          <a href="#" className="hover:text-red-700 mx-2"><FaInstagram /></a>
        </div>
        <div className="flex space-x-4 ">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Rooms</a>
          <a href="#" className="hover:text-gray-400">About Us</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>
      </div>
      <div className="mt-4 text-center mr-24">
        <p>&copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.</p>
      </div>
    
    </motion.div>
    </motion.footer>
  );
};

export default Footer;
