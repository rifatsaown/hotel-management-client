import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const InfoContext = createContext(null);

const InfoProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [heroDetails, setHeroDetails] = useState([]);
  const [aboutUs, setAboutUs] = useState({});
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/hotelInfo").then((res) => {
      setBasicInfo(res.data[0]);

      axios.get("http://localhost:5000/api/heroDetails").then((res) => {
        setHeroDetails(res.data);
      });

      axios.get("http://localhost:5000/api/aboutUs").then((res) => {
        setAboutUs(res.data);
      });

      axios.get("http://localhost:5000/api/services").then((res) => {
        setServices(res.data);
      });
    });
  }, []);

  const hotelInfo = {
    basicInfo,
    heroDetails,
    aboutUs,
    services,
  };

  return (
    <InfoContext.Provider value={hotelInfo}>{children}</InfoContext.Provider>
  );
};

export default InfoProvider;
