import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";

export default function Rules() {
  const { rules } = useFirmsContext();
  const [selectedRules, setSelectedRules] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!rules || rules.length === 0) {
    return <p>No firms data available to display.</p>;
  }

  // Define the human-readable rule names
  const uniqueRules = [
    "News Trading Rule",
    "Consistency Rule",
    "Copy Trading",
    "Two Percent Rule",
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
          default:
            return false;
        }
      })
    );

    setFilteredData(result);
  };

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
          hasSearched && <p>No firms match the selected trading rules.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

Rules.useFirmsProvider = true;
