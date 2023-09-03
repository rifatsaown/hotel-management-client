// Import Swiper React components
import { useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { InfoContext } from "../../../provider/InfoProvider";
import AvailabilityForm from "../../../components/AvailabilityForm";
import "./Hero.css";
import { BsFillCheckSquareFill } from "react-icons/bs";

const Hero = () => {
  const { basicInfo, heroDetails } = useContext(InfoContext);
  return (
    <section className="mb-8">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={2000}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Parallax, Pagination, Navigation]}
        className="mySwiper min-h-[90vh] rounded-2xl mt-1"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage: `url(${basicInfo?.insideImg})`,
          }}
          data-swiper-parallax="-23%"
        ></div>
        {heroDetails?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center h-[80vh] lg:mx-48">
              <div className="">
                <div
                  className="lg:text-6xl text-3xl font-bold"
                  data-swiper-parallax="-400"
                >
                  {item?.title}
                </div>
                <div className="lg:w-1/2 mt-4" data-swiper-parallax="-300">
                  <p>{item?.description}</p>
                </div>
                <div
                  className="btn btn-wide btn-outline btn-primary mt-4"
                  data-swiper-parallax="-200"
                >
                  Book Now <BsFillCheckSquareFill />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="">
        <AvailabilityForm />
      </div>
    </section>
  );
};

export default Hero;
