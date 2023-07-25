// Import Swiper React components
import { useContext } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { InfoContext } from "../../../provider/InfoProvider";
import "./Hero.css";
import AvailabilityForm from "./AvailabilityForm";

const Hero = () => {
  const { basicInfo, heroDetails } = useContext(InfoContext);

  return (
    <section>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
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
            <div className="flex justify-center items-center h-[80vh] mx-48">
              <div className="">
                <div className="text-6xl font-bold" data-swiper-parallax="-400">
                  {item?.title}
                </div>
                <div className="w-1/2 mt-4" data-swiper-parallax="-300">
                  <p>{item?.description}</p>
                </div>
                <div
                  className="btn btn-wide btn-outline btn-primary mt-4"
                  data-swiper-parallax="-200"
                >
                  Book Now
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
      </Swiper>
      <div className="max-w-screen-xl mx-auto">
      <AvailabilityForm />
      </div>
    </section>
  );
};

export default Hero;
