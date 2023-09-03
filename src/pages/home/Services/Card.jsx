import { CgPullClear } from "react-icons/cg";
import { FiCoffee, FiMonitor } from "react-icons/fi";
import { GiMuscleUp } from "react-icons/gi";
import { TiWiFi } from "react-icons/ti";

const Card = () => {
  // Can be load from API
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center w-full text-center backdrop-blur-2xl p-4 rounded-xl">
        <TiWiFi size={50} />
        <p>Free Wifi</p>
      </div>
      <div className="flex flex-col items-center w-full text-center backdrop-blur-2xl p-4 rounded-xl">
        <CgPullClear size={50} />
        <p>Rooftop Infinity Pool</p>
      </div>
      <div className="flex flex-col items-center w-full text-center backdrop-blur-2xl p-4 rounded-xl">
        <GiMuscleUp size={50} />
        <p>A fitness center</p>
      </div>
      <div className="flex flex-col items-center w-full text-center backdrop-blur-2xl p-4 rounded-xl">
        <FiMonitor size={50} />
        <p>Smart TV</p>
      </div>
      <div className="flex flex-col items-center w-full text-center backdrop-blur-2xl p-4 rounded-xl">
        <FiCoffee size={50} />
        <p>A Nespresso coffee machine</p>
      </div>
    </div>
  );
};

export default Card;
