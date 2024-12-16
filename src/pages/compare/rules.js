import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";
import Spinner from "@/components/Spinner";

export default function Rules() {
  const { rules, loading } = useFirmsContext();
  const [selectedRules, setSelectedRules] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  // Define the human-readable rule names
  const uniqueRules = [
    "News Trading Rule",
    "Consistency Rule",
    "Copy Trading",
    "Two Percent Rule",
    "Stop Loss Rule",
  ];

  const toggleRule = (option) => {
    setSelectedRules((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const searchFirms = () => {
    setHasSearched(true);

    if (selectedRules.length === 0) {
      setErrorMessage("No options are selected");
      setFilteredData([]);
      return;
    }

    setErrorMessage(""); // Clear previous error messages

    // Filter firms based on selected rules
    const result = rules.filter((firm) =>
      selectedRules.every((rule) => {
        switch (rule) {
          case "News Trading Rule":
            return firm.news_rule === true;
          case "Consistency Rule":
            return firm.consistency_rule === true;
          case "Copy Trading":
            return firm.copy_trading === true;
          case "Two Percent Rule":
            return firm.two_percent_rule === true;
          case "Stop Loss Rule":
            return firm.stop_loss_rule === true;
          default:
            return false;
        }
      })
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
        Compare Firms by Trading Rules
      </h2>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <h4>Select Trading Rules:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueRules.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedRules.includes(option)}
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
          !errorMessage && (
            <p>No firm match the selected trading rule or rules.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

Rules.useFirmsProvider = true;