import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import Footer from "../Footer";
import Header from "@/components/Header";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";

export default function Country() {
  const { country } = useFirmsContext();
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const expandableRenderer = (rowData) => {
    return <ExpandableRowDetails rowData={rowData} />;
  };

  const searchFirms = () => {
    setHasSearched(true);

    if (!searchQuery.trim()) {
      setErrorMessage(
        "No options are selected. Please enter at least one country."
      );
      setFilteredData([]);
      return;
    }

    setErrorMessage(""); // Clear previous error messages

    // Normalize and clean up the user input
    const queryCountries = searchQuery
      .split(",")
      .map((country) => country.trim().toLowerCase());

    const result = country.filter((firm) => {
      // Clean up the prohibited countries for each firm
      const prohibitedCountries = firm.countries_prohibited.map((c) =>
        c.replace(/,|\s+$/g, "").toLowerCase()
      );

      // Check if any of the query countries exist in the prohibited list
      return !queryCountries.some((query) =>
        prohibitedCountries.includes(query)
      );
    });

    setFilteredData(result);
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
        Search for Prop Firms allowed in your country
      </h2>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <h4>Search by Country (Separate multiple countries with commas):</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter country names"
            style={{
              padding: "0.5rem",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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

Country.useFirmsProvider = true;
