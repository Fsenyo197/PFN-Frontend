"use client";

import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";

export default function YearEstablished() {
  const { yearEstablished } = useFirmsContext();
  const [selectedYearEstablished, setSelectedYearEstablished] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const toggleYearEstablished = (option) => {
    setSelectedYearEstablished((prev) => (prev === option ? null : option));
  };

  const searchFirms = () => {
    setHasSearched(true);

    if (!selectedYearEstablished) {
      setFilteredData(yearEstablished);
      return;
    }

    const result = yearEstablished.filter((firm) => {
      const yearsDiff = new Date().getFullYear() - firm.year_established;
      if (selectedYearEstablished.includes("above")) {
        const threshold = parseInt(selectedYearEstablished.split(" ")[2], 10);
        return yearsDiff > threshold;
      }
      if (selectedYearEstablished.includes("below")) {
        const threshold = parseInt(selectedYearEstablished.split(" ")[2], 10);
        return yearsDiff < threshold;
      }
      return false;
    });

    setFilteredData(result);
  };

  const compareyearEstablished = [
    "Firms above 5 years",
    "Firms below 5 years",
    "Firms above 4 years",
    "Firms below 4 years",
    "Firms above 3 years",
    "Firms below 3 years",
    "Firms above 2 years",
    "Firms below 2 years",
    "Firms above 1 year",
    "Firms below 1 year",
  ];

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
        Compare Firms by years of operation
      </h2>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <h4>Select years of operation:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {compareyearEstablished.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedYearEstablished === option}
              onClick={() => toggleYearEstablished(option)}
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
          hasSearched && (
            <p>No firms match the selected for year established.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

YearEstablished.useFirmsProvider = true;
