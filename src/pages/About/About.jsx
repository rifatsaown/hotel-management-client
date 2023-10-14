import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-white py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* About Us Section */}
      <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-600 mb-8">
            Welcome to Galaxies Hotel, where comfort meets luxury. We are committed to providing our guests with an unforgettable experience in the heart of the cosmos.
          </p>
        <p className="text-gray-600 mb-8">
          Our hotel offers a wide range of amenities and services to make your stay exceptional. From our celestial-themed suites to our galaxy-view restaurant, every detail has been carefully crafted for your enjoyment.
        </p>
        <p className="text-gray-600 mb-8">
          Whether you&apos;re here for a relaxing vacation or a business trip, Galaxies Hotel is your home away from home. Explore the universe with us, and let us take care of the rest.
        </p>
        </div>
      </section>

      {/* Our Rooms Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Rooms</h2>
          <p className="text-gray-600 mb-8">
            Explore our wide range of celestial-themed rooms designed for your comfort and relaxation. Each room offers a unique view of the galaxy.
          </p>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Amenities</h2>
          <p className="text-gray-600 mb-8">
            Enjoy our stellar amenities, including our galaxy-view restaurant, spa and fitness center, and conference facilities. We have everything you need for an extraordinary stay.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
