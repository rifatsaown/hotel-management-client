import { useContext } from "react";
import { InfoContext } from "../../../provider/InfoProvider";
import Card from "./Card";

const Services = () => {
  const { services } = useContext(InfoContext);

  return (
    <section id="services"
      className="h-[70vh] text-white "
      style={{
        backgroundImage: `url(${services?.bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "1.5rem",
        clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
      }}
    >
      <div className="w-full h-full pl-4 flex justify-around rounded-3xl items-center backdrop-brightness-50 flex-wrap">
        <div className="lg:w-2/5 w">
          <h2 className="text-3xl lg:text-5xl font-bold">{services?.title}</h2>
          <p className="mt-2">{services?.details}</p>
        </div>
        <div>
            <Card />
        </div>
      </div>
      
    </section>
  );
};

export default Services;
