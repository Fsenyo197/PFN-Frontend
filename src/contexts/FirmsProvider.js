import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  saveFirmsToIndexedDB,
  getFirmsFromIndexedDB,
  isCacheExpired,
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
    firms: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndUpdateFirms = async () => {
      try {
        // Get cached data and the last updated timestamp
        const { firms: cachedFirms, lastUpdated } =
          await getFirmsFromIndexedDB();

        // Check if the cache is expired
        if (isCacheExpired(lastUpdated)) {
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

          // Save the fetched data to IndexedDB
          await saveFirmsToIndexedDB(fetchedData);

          // Update the context state
          setFirmsData({
            country: fetchedData,
            payoutOptions: fetchedData,
            platforms: fetchedData,
            yearEstablished: fetchedData,
            rules: fetchedData,
            prices: fetchedData,
            bestChoices: fetchedData,
            firms: fetchedData,
          });
        } else {
          // Use the cached data
          setFirmsData({
            country: cachedFirms,
            payoutOptions: cachedFirms,
            platforms: cachedFirms,
            yearEstablished: cachedFirms,
            rules: cachedFirms,
            prices: cachedFirms,
            bestChoices: cachedFirms,
            firms: cachedFirms,
          });
        }
      } catch (err) {
        setError(
          'An error occurred while fetching firms data. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateFirms();
  }, []);

  // Helper function to get a firm by slug
  const getFirmBySlug = (slug) => {
    return firmsData.firms.find((firm) => firm.slug === slug);
  };

  return (
    <FirmsContext.Provider
      value={{ ...firmsData, loading, error, getFirmBySlug }}
    >
      {children}
    </FirmsContext.Provider>
  );
};
