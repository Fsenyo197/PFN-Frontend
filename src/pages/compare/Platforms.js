import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";

export default function Platforms() {
  const { platforms, loading } = useFirmsContext();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (loading) return <p>Loading...</p>;

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
    const result = platforms.filter((firm) =>
      selectedPlatforms.every((option) =>
        firm.trading_platforms.includes(option)
      )
    );
    setFilteredData(result);
  };

  const columns = [
    { key: "name", label: "Firm Name" },
    {
      key: "news_rule",
      label: "News Trading Rule",
      render: (value) => {
        return value === true
          ? "Yes"
          : value === false
          ? "No"
          : "Not Indicated";
      },
    },
    {
      key: "consistency_rule",
      label: "Consistency Rule",
      render: (value) => {
        return value === true
          ? "Yes"
          : value === false
          ? "No"
          : "Not Indicated";
      },
    },
    {
      key: "copy_trading",
      label: "Copy Trading",
      render: (value) => {
        return value === true
          ? "Yes"
          : value === false
          ? "No"
          : "Not Indicated";
      },
    },
    {
      key: "two_percent_rule",
      label: "Two Percent Rule",
      render: (value) => {
        return value === true
          ? "Yes"
          : value === false
          ? "No"
          : "Not Indicated";
      },
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

  const expandableRenderer = (rowData) => {
    return (
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
      <div style={{ width: "100%", margin: "1rem 0" }}>
        {filteredData.length > 0 ? (
          <GenericTable
            columns={columns}
            data={data}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          hasSearched && <p>No firms match the selected trading platforms.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Platforms.useFirmsProvider = true;
