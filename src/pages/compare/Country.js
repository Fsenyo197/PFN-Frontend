import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import Footer from "../Footer";
import Header from "@/components/Header";
import FirmComparisonTable from "@/components/FirmComparisonTable";

export default function Country() {
  const { country } = useFirmsContext();
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!country || country.length === 0) {
    return <p>No firms data available to display.</p>;
  }

  const expandableRenderer = (rowData) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <p>
        <strong>Firm Type:</strong> {rowData.firm_type}
      </p>
      <p>
        <strong>Payment Options:</strong> {rowData.payment_options}
      </p>
      <p>
        <strong>Payout Options:</strong> {rowData.payout_options}
      </p>
      <p>
        <strong>Trading Platforms:</strong> {rowData.trading_platforms}
      </p>
      <p>
        <strong>Prohibited Countries:</strong> {rowData.countries_prohibited}
      </p>
    </div>
  );

  const searchFirms = () => {
    setHasSearched(true);

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
        Compare Firms by Trading Country
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
            onClick={searchFirms}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#02353C",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        {filteredData.length > 0 ? (
          <FirmComparisonTable
            filteredData={filteredData}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          hasSearched && <p>No firms match the selected payout options.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Country.useFirmsProvider = true;
