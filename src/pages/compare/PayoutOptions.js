import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";

export default function PayoutOptions() {
  const { payoutOptions } = useFirmsContext();
  const [selectedPayoutOptions, setSelectedPayoutOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Dynamically create unique payout options from the context data
  const uniquePayoutOptions = [
    ...new Set(payoutOptions.flatMap((firm) => firm.payout_options)),
  ];

  const togglePayoutOption = (option) => {
    setSelectedPayoutOptions((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const searchFirms = () => {
    setHasSearched(true);
    if (selectedPayoutOptions.length === 0) {
      setErrorMessage("No options are selected");
      return;
    }
    setErrorMessage("");
    const result = payoutOptions.filter((firm) =>
      selectedPayoutOptions.every((option) =>
        firm.payout_options.includes(option)
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
        Compare Firms by Payout Options
      </h2>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <h4>Select Payout Options:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniquePayoutOptions.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedPayoutOptions.includes(option)}
              onClick={() => togglePayoutOption(option)}
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
          Search for firms
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div style={{ width: "100%", margin: "1rem 0" }}>
        {filteredData.length > 0 ? (
          <GenericTable
            columns={columns}
            data={data}
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

PayoutOptions.useFirmsProvider = true;
