import React, { createContext, useContext, useEffect, useState } from "react";
import CompareByRules from "@/components/CompareByRules";
import CompareByPrice from "@/components/CompareByPrice";
import CompareByPlatforms from "@/components/CompareByPlatforms";
import CompareByCountry from "@/components/CompareByCountry";
import CompareByPayoutOptions from "@/components/CompareByPayoutOptions";
import CompareByYearEstablished from "@/components/CompareByYearEstablished";

// Mock data for testing
const mockFirms = [
  {
    id: 1,
    name: "PropFirm A",
    payout_options: true,
    trading_platforms: ["MT4", "MT5"],
    price: 200,
    consistency_rule: true,
    two_percent_rule: false,
    year_established: 2020,
    location: "USA",
  },
  {
    id: 2,
    name: "PropFirm B",
    payout_options: false,
    trading_platforms: ["cTrader"],
    price: 150,
    consistency_rule: false,
    two_percent_rule: true,
    year_established: 2018,
    location: "UK",
  },
  {
    id: 3,
    name: "PropFirm C",
    payout_options: true,
    trading_platforms: ["MT4"],
    price: 100,
    consistency_rule: false,
    two_percent_rule: false,
    year_established: 2019,
    location: "Canada",
  },
  // Add more mock firm objects as needed
];

// Create a Context for the firms data
const FirmsContext = createContext();

export const useFirms = () => useContext(FirmsContext);

export default function PropFirmsProvider({ children }) {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data with mock data
    const getPropFirms = async () => {
      try {
        // Normally here you would fetch data from an API
        setFirms(mockFirms); // Use mock data instead
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
