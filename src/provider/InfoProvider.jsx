import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const InfoContext = createContext(null);
axios.defaults.baseURL = 'http://localhost:5000';

const InfoProvider = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [heroDetails, setHeroDetails] = useState([]);
  const [aboutUs, setAboutUs] = useState({});
  const [services, setServices] = useState([]);
  const [rooms, setRooms] = useState([]);

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

      axios.get("/rooms/allrooms").then((res) => {
        setRooms(res.data);
      });
    });
  }, []);


  const hotelInfo = {
    paymentInfo,
    setPaymentInfo,
    basicInfo,
    heroDetails,
    aboutUs,
    services,
    rooms,
  };

  return (
    <InfoContext.Provider value={hotelInfo}>{children}</InfoContext.Provider>
  );
};

export default InfoProvider;
