import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../shared/motion";

const Newsletter = () => {
  return (
    <motion.div
    variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
    >
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Stay updated with our latest news and updates. Subscribe now!</p>
          <form className="flex flex-col sm:flex-row justify-center items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="input input-primary"
              required
            />
            <button
              type="submit"
              className="btn btn-primary "
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
    </motion.div>
  );
};

export default Newsletter;
