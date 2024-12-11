import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";
import Footer from "../Footer";
import Header from "@/components/Header";

export default function Country() {
  const { country } = useFirmsContext();
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!country || country.length === 0) {
    return <p>No firms data available to display.</p>;
  }

  const columns = [
    { key: "name", label: "Firm Name" },
    {
      key: "news_rule",
      label: "News Trading Rule",
      render: (value) => (value === true ? "Yes" : "No"),
    },
    {
      key: "consistency_rule",
      label: "Consistency Rule",
      render: (value) => (value === true ? "Yes" : "No"),
    },
    {
      key: "copy_trading",
      label: "Copy Trading",
      render: (value) => (value === true ? "Yes" : "No"),
    },
    {
      key: "two_percent_rule",
      label: "Two Percent Rule",
      render: (value) => (value === true ? "Yes" : "No"),
    },
    { key: "location", label: "Location" },
    { key: "year_established", label: "Year Established" },
  ];

  const data = filteredData.map((firm) => ({
    id: firm.id,
    name: firm.name,
    news_rule: firm.news_rule,
    consistency_rule: firm.consistency_rule,
    copy_trading: firm.copy_trading,
    two_percent_rule: firm.two_percent_rule,
    location: firm.location,
    year_established: firm.year_established,
    firm_type: firm.firm_type,
    payment_options: firm.payment_options.join(", "),
    payout_options: firm.payout_options.join(", "),
    trading_platforms: firm.trading_platforms.join(", "),
    countries_prohibited: firm.countries_prohibited.join(", "),
  }));

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
          <GenericTable
            columns={columns}
            data={data}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          hasSearched && <p>No firms match the search criteria.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Country.useFirmsProvider = true;
