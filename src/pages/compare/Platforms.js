import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";

export default function Platforms() {
  const { platforms } = useFirmsContext();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!platforms || platforms.length === 0) {
    return <p>No firms data available to display.</p>;
  }

  // Dynamically create unique trading platforms from the context data
  const uniqueTradingPlatforms = [
    ...new Set(platforms.flatMap((firm) => firm.trading_platforms)),
  ];

  const togglePlatform = (option) => {
    setSelectedPlatforms((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const searchFirms = () => {
    setHasSearched(true);
    if (selectedPlatforms.length === 0) {
      setErrorMessage("No options are selected");
      setFilteredData([]);
      return;
    }
    setErrorMessage("");
    const result = platforms.filter((firm) =>
      selectedPlatforms.every((option) =>
        firm.trading_platforms.includes(option)
      )
    );
    setFilteredData(result);
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
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Compare Firms by Trading Platforms
      </h2>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <h4>Select Trading Platforms:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueTradingPlatforms.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedPlatforms.includes(option)}
              onClick={() => togglePlatform(option)}
            />
          ))}
        </div>
        <button
          onClick={searchFirms}
          style={{
            marginTop: "4rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#02353C",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search for Firms
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
          !errorMessage && <p>No firms match the selected payout options.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Platforms.useFirmsProvider = true;
