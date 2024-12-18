import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import Footer from "../Footer";
import Header from "@/components/Header";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";
import Spinner from "@/components/Spinner";

export default function Country() {
  const { country, loading } = useFirmsContext();
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  if (loading) {
    return <Spinner />;
  }

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

    setErrorMessage("");

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
      <h1 style={{ marginTop: "2rem", marginBottom: "2rem", padding: 16 }}>
        Search for Prop Firms allowed in your country
      </h1>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold", padding: 16 }}>
          Search by Country (Separate multiple countries with commas):
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
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
              padding: "0.75rem 1rem",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "8px",
              fontSize: "1rem",
              color: "#333",
              outline: "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)")
            }
            onBlur={(e) =>
              (e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)")
            }
          />

          <button
            onClick={() => {
              setIsClicked(true);
              searchFirms();
              setTimeout(() => setIsClicked(false), 200);
            }}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#02353C",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
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
          !errorMessage && (
            <p>No firm match the entered country or countries.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

Country.useFirmsProvider = true;
