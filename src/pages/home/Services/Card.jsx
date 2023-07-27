import { CgPullClear } from "react-icons/cg";
import { FiCoffee, FiMonitor } from "react-icons/fi";
import { GiMuscleUp } from "react-icons/gi";
import { TiWiFi } from "react-icons/ti";

const Card = () => {
  // Can be load from API
  return (
    <div className="">
      <h2 className="text-2xl font-semibold">We have:</h2>
      <ul>
        <li className="flex items-center">
          <TiWiFi /> <span className="ml-2">Free Wifi</span>
        </li>
        <li className="flex items-center">
          <CgPullClear /> <span className="ml-2">Rooftop Infinity Pool</span>
        </li>
        <li className="flex items-center">
          <GiMuscleUp /> <span className="ml-2">A fitness center</span>
        </li>
        <li className="flex items-center">
          <FiMonitor /> <span className="ml-2">Smart TV</span>
        </li>
        <li className="flex items-center">
          <FiCoffee />{" "}
          <span className="ml-2">A Nespresso coffee machine ineatch room</span>
        </li>
        <li></li>
      </ul>
    </div>
  );
};

export default Card;
