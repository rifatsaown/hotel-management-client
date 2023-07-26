import { useContext } from "react";
import { InfoContext } from "../../../provider/InfoProvider";
import Card from "./Card";

const Services = () => {
  const { services } = useContext(InfoContext);

  return (
    <div
      className="h-[70vh] text-white"
      style={{
        backgroundImage: `url(${services?.bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full flex justify-between items-center backdrop-brightness-50">
        <div className="w-1/2">
          <h2 className="text-3xl lg:text-5xl font-bold">{services?.title}</h2>
          <p className="mt-2">{services?.details}</p>
        </div>
        <div>
            <Card />
        </div>
      </div>
      
    </div>
  );
};

export default Services;
