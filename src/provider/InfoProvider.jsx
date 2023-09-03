import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const InfoContext = createContext(null);
axios.defaults.baseURL = 'http://localhost:5000';

const InfoProvider = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState({});
  const [heroDetails, setHeroDetails] = useState([]);
  const [aboutUs, setAboutUs] = useState({});
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/api/hotelInfo").then((res) => {
      setBasicInfo(res.data[0]);

      axios.get("/api/heroDetails").then((res) => {
        setHeroDetails(res.data);
      });

      axios.get("/api/aboutUs").then((res) => {
        setAboutUs(res.data);
      });

      axios.get("/api/services").then((res) => {
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
