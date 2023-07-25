import { useContext } from "react";
import { InfoContext } from "../../../provider/InfoProvider";

const AboutUs = () => {
  const { aboutUs } = useContext(InfoContext);
  return (
    <section className="">
      <div className="lg:flex">
        <div className="grid items-center lg:w-1/2 lg:order-last">
          <div className="pl-4">
            <h3 className="text-lg uppercase mb-4 text-slate-500">
              {aboutUs?.subHeading}
            </h3>
            <h1 className="lg:text-7xl text-4xl font-bold">
              {aboutUs?.heading}
            </h1>
            <p className="mt-2">{aboutUs?.content}</p>
            <button className="btn btn-wide btn-primary mt-4">
              About us
            </button>
          </div>
        </div>
        <div className="">
          <div className="lg:w-1/2 lg:ml-20 p-4">
            <img src={aboutUs?.bannerImg1} alt="" />
          </div>
          <div className="lg:w-1/2 lg:-mt-48">
            <img src={aboutUs?.bannerImg2} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
