import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const InfoContext = createContext(null);

const InfoProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [heroDetails, setHeroDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/hotelInfo").then((res) => {
      setBasicInfo(res.data);
    
    axios.get("http://localhost:5000/api/heroDetails").then((res) => {
      setHeroDetails(res.data);
    });
    });
  }, []);

  const hotelInfo = {
    basicInfo,
    heroDetails,
  };

  return (
    <InfoContext.Provider value={hotelInfo}>{children}</InfoContext.Provider>
  );
};

export default InfoProvider;
