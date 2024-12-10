import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FirmsContext = createContext();

export const useFirmsContext = () => useContext(FirmsContext);

export const FirmsProvider = ({ children }) => {
  const [firmsData, setFirmsData] = useState({
    country: [],
    payoutOptions: [],
    platforms: [],
    establishedYear: [],
    rules: [],
    price: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.SENSITIVE_API_BASE_URL}/propfirms/`,
          {
            headers: {
              "X-API-Key": process.env.SENSITIVE_API_KEY,
              "X-API-Secret": process.env.SENSITIVE_API_SECRET,
            },
          }
        );
        setFirmsData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch firms data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FirmsContext.Provider value={{ ...firmsData, loading }}>
      {children}
    </FirmsContext.Provider>
  );
};
