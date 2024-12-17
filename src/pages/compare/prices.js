import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import Header from "@/components/Header";
import Footer from "../Footer";
import RoundButton from "@/components/RoundButton";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";
import Spinner from "@/components/Spinner";

export default function Prices() {
  const { prices, loading } = useFirmsContext();
  const [selectedPayoutFrequency, setSelectedPayoutFrequency] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (loading) return <Spinner />;

  // Unique account sizes and payout frequencies
  const uniqueAccountSizes = [
    ...new Set(
      prices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.account_size)
      )
    ),
  ];

  const uniquePayoutFrequencies = [
    ...new Set(platforms.flatMap((firm) => firm.payout_frequency)),
  ];

  // Toggle payout frequency selection
  const toggleRule = (option) => {
    setSelectedPayoutFrequency((prev) => (prev === option ? "" : option));
  };

  // Get best prices with optional payout frequency filtering
  const getBestPrices = () => {
    const bestPrices = uniqueAccountSizes.map((accountSize) => {
      const bestFirm = prices.reduce((best, firm) => {
        const relevantPlan = firm.account_plans?.find(
          (plan) =>
            plan.account_size === accountSize &&
            (selectedPayoutFrequency === "" ||
              plan.payout_frequency === selectedPayoutFrequency)
        );

        if (!relevantPlan) return best;

        if (!best || relevantPlan.price < best.price) {
          return {
            firm_name: firm.name,
            price: relevantPlan.price,
            account_size: accountSize,
            payout_frequency: relevantPlan.payout_frequency,
          };
        }
        return best;
      }, null);
      return bestFirm;
    });

    return bestPrices.filter(Boolean); // Remove any nulls
  };

  const searchFirms = () => {
    try {
      const results = getBestPrices();
      setFilteredData(results);
      setHasSearched(true);
      setErrorMessage(results.length ? "" : "No matching firms found.");
    } catch (error) {
      setErrorMessage("An error occurred while searching for firms.");
    }
  };

  const expandableRenderer = (rowData) => {
    return <ExpandableRowDetails rowData={rowData} />;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Header />
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Compare Firms</h2>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniquePayoutFrequencies.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedPayoutFrequency === option}
              onClick={() => toggleRule(option)}
            />
          ))}
        </div>
        <button
          onClick={() => {
            setIsClicked(true);
            searchFirms();
            setTimeout(() => setIsClicked(false), 200);
          }}
          style={{
            marginTop: "4rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#02353C",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transform: isClicked ? "scale(0.95)" : "scale(1)",
            transition: "transform 0.1s ease-out",
          }}
        >
          Search for firms
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div style={{ width: "100%", margin: "1rem 0" }}>
        {filteredData.length > 0 ? (
          <FirmComparisonTable
            filteredData={filteredData}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          hasSearched &&
          !errorMessage && <p>No firm matches for the selected criteria.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Prices.useFirmsProvider = true;
