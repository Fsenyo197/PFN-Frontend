import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import RoundButton from "@/components/RoundButton";
import Footer from "../Footer";
import Header from "@/components/Header";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";
import Spinner from "@/components/Spinner";
import Head from "next/head";

export default function PayoutOptions() {
  const { payoutOptions, loading } = useFirmsContext();
  const [selectedPayoutOptions, setSelectedPayoutOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  if (loading) {
    return <Spinner />;
  }

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
      setFilteredData([]);
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
      <Head>
        <title>Payout Options - Compare Firms</title>
        <meta
          name="description"
          content="Explore and compare firms based on their payout options, including bank transfers, PayPal, cryptocurrencies, and other payment methods."
        />
        <meta
          name="keywords"
          content="compare firms by payout options, firm payout methods, best firm payment options, bank transfer firms, PayPal payouts, cryptocurrency payouts"
        />
      </Head>
      <Header />
      <h1 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Compare Firms by Payout Options
      </h1>
      <div style={{ width: "100%", margin: "1rem 0" }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Select Payout Options:
        </p>
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
          onClick={() => {
            setIsClicked(true);
            searchFirms();
            setTimeout(() => setIsClicked(false), 200);
          }}
          style={{
            marginTop: "4rem",
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
            <p>No firm match the selected payout option or options.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

PayoutOptions.useFirmsProvider = true;
