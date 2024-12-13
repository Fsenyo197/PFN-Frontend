import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FirmsContext = createContext();

export const useFirmsContext = () => useContext(FirmsContext);

export const FirmsProvider = ({ children }) => {
  const [firmsData, setFirmsData] = useState({
    country: [],
    payoutOptions: [],
    platforms: [],
    yearEstablished: [],
    rules: [],
    ss: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/propfirms/`,
          {
            headers: {
              "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
              "X-API-Secret": process.env.NEXT_PUBLIC_API_SECRET,
            },
          }
        );

        const transformedData = response.data.map((firm) => ({
          ...firm,
          countries_prohibited: firm.countries_prohibited
            ? firm.countries_prohibited
                .split(", ")
                .map((option) => option.trim())
            : [],
        }));

        console.log("transformedData:", transformedData);

        setFirmsData({
          country: transformedData,
          payoutOptions: transformedData,
          platforms: transformedData,
          yearEstablished: transformedData,
          rules: transformedData,
          prices: transformedData,
        });
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
