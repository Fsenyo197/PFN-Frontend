import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
  saveFirmsToIndexedDB,
  getFirmsFromIndexedDB,
} from "../utils/indexedDB";

const FirmsContext = createContext();

export const useFirmsContext = () => useContext(FirmsContext);

export const FirmsProvider = ({ children }) => {
  const [firmsData, setFirmsData] = useState({
    country: [],
    payoutOptions: [],
    platforms: [],
    yearEstablished: [],
    rules: [],
    prices: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get firms data from IndexedDB first
        const cachedData = await getFirmsFromIndexedDB();
        if (cachedData.length > 0) {
          console.log("Using cached firms data from IndexedDB");
          setFirmsData({
            country: cachedData,
            payoutOptions: cachedData,
            platforms: cachedData,
            yearEstablished: cachedData,
            rules: cachedData,
            prices: cachedData,
          });
        } else {
          // Fetch data from the API if not in IndexedDB
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

          // Save the fetched data to IndexedDB
          await saveFirmsToIndexedDB(transformedData);

          setFirmsData({
            country: transformedData,
            payoutOptions: transformedData,
            platforms: transformedData,
            yearEstablished: transformedData,
            rules: transformedData,
            prices: transformedData,
          });
        }
      } catch (error) {
        console.error("Failed to fetch or cache firms data", error);
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
