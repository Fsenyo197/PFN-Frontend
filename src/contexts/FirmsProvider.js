import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  saveFirmsToIndexedDB,
  getFirmsFromIndexedDB,
} from '../utils/indexedDB';

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
    bestChoices: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndUpdateFirms = async () => {
      try {
        // Get cached data from IndexedDB
        const cachedData = await getFirmsFromIndexedDB();

        // Fetch fresh data from the API
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/propfirms/`,
          {
            headers: {
              'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
              'X-API-Secret': process.env.NEXT_PUBLIC_API_SECRET,
            },
          }
        );

        const fetchedData = response.data.map((firm) => ({
          ...firm,
          countries_prohibited: firm.countries_prohibited
            ? firm.countries_prohibited
                .split(', ')
                .map((option) => option.trim())
            : [],
        }));

        // Check if data has changed
        const newData = fetchedData.filter(
          (newFirm) =>
            !cachedData.some((cachedFirm) => cachedFirm.id === newFirm.id)
        );

        if (newData.length > 0) {
          await saveFirmsToIndexedDB(newData);
        }

        // Merge cached and new data
        const allFirms = [...cachedData, ...newData];

        // Update the context state
        setFirmsData({
          country: allFirms,
          payoutOptions: allFirms,
          platforms: allFirms,
          yearEstablished: allFirms,
          rules: allFirms,
          prices: allFirms,
          bestChoices: allFirms,
        });
      } catch (error) {
        setError(
          'An error occurred while fetching firms data. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateFirms();
  }, []);

  return (
    <FirmsContext.Provider value={{ ...firmsData, loading, error }}>
      {children}
    </FirmsContext.Provider>
  );
};
