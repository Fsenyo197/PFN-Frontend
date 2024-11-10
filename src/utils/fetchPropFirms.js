import axios from "axios";

const fetchPropFirms = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/propfirms/`,
      {
        headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching prop firms:", error);
    return [];
  }
};

export default fetchPropFirms;


import React, { createContext, useContext, useEffect, useState } from "react";
import fetchPropFirms from "@/utils/fetchPropFirms";
import CompareByRules from "@/components/CompareByRules";
import CompareByPrice from "@/components/CompareByPrice";
import CompareByPlatforms from "@/components/CompareByPlatforms";
import CompareByCountry from "@/components/CompareByCountry";
import CompareByPayoutOptions from "@/components/CompareByPayoutOptions";
import CompareByYearEstablished from "@/components/CompareByYearEstablished";

// Create a Context for the firms data
const FirmsContext = createContext();

export const useFirms = () => useContext(FirmsContext);

export default function PropFirmsProvider({ children }) {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPropFirms = async () => {
      try {
        const data = await fetchPropFirms();
        setFirms(data);
      } catch (error) {
        setError("Failed to fetch prop firms.");
      } finally {
        setLoading(false);
      }
    };
    getPropFirms();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Centralized filtering logic for each comparison criteria
  const filteredData = {
    payoutOptionsFirms: firms.filter((firm) => firm.payout_options),
    platformsFirms: firms.filter(
      (firm) => firm.trading_platforms && firm.trading_platforms.length > 0
    ),
    priceFirms: firms.filter((firm) => firm.price),
    rulesFirms: firms.filter(
      (firm) => firm.consistency_rule || firm.two_percent_rule
    ),
    establishedYearFirms: firms.filter((firm) => firm.year_established),
    countryFirms: firms.filter((firm) => firm.location),
  };

  return (
    <FirmsContext.Provider value={filteredData}>
      {children}
    </FirmsContext.Provider>
  );
}

// The main page component
export function PropFirms() {
  return (
    <PropFirmsProvider>
      <div>
        <h1>Prop Firms Comparison</h1>
        <CompareByPayoutOptions />
        <CompareByPlatforms />
        <CompareByPrice />
        <CompareByRules />
        <CompareByYearEstablished />
        <CompareByCountry />
      </div>
    </PropFirmsProvider>
  );
}

 