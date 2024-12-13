import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import Header from "@/components/Header";
import Footer from "../Footer";
import PricesFilters from "@/components/PricesFilters";
import FirmComparisonTable from "@/components/FirmComparisonTable";

export default function Prices() {
  const { prices } = useFirmsContext();
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedFirmTypes, setSelectedFirmTypes] = useState([]);
  const [selectedAccountSizes, setSelectedAccountSizes] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [selectedSplitRatios, setSelectedSplitRatios] = useState([]);
  const [selectedDailyDrawdowns, setSelectedDailyDrawdowns] = useState([]);
  const [selectedTotalDrawdowns, setSelectedTotalDrawdowns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!prices || prices.length === 0) {
    return <p>No firms data available to display.</p>;
  }

  // Define unique options
  const uniqueFirmTypes = [
    ...new Set(prices.flatMap((firm) => firm.firm_type)),
  ];
  const uniqueAccountSizes = [
    ...new Set(
      prices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.account_size)
      )
    ),
  ];
  const uniquePhases = [
    ...new Set(
      prices.flatMap((firm) => firm.account_plans?.map((plan) => plan.phase))
    ),
  ];
  const uniquePrices = [
    ...new Set(
      prices.flatMap((firm) => firm.account_plans?.map((plan) => plan.price))
    ),
  ];
  const uniqueSplitRatios = [
    ...new Set(
      prices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.profit_split_ratio)
      )
    ),
  ];
  const uniqueDailyDrawdowns = [
    ...new Set(
      prices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.daily_drawdown)
      )
    ),
  ];
  const uniqueTotalDrawdowns = [
    ...new Set(
      prices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.total_drawdown)
      )
    ),
  ];

  // Define toggle functions
  const toggleFilter = (setState) => (option) => {
    setState((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  // Filtering logic
  const searchFirms = () => {
    setHasSearched(true);
    const filtered = prices.filter((firm) => {
      return (
        (selectedFirmTypes.length === 0 ||
          selectedFirmTypes.includes(firm.firm_type)) &&
        firm.account_plans.some((plan) => {
          return (
            (selectedAccountSizes.length === 0 ||
              selectedAccountSizes.includes(plan.account_size)) &&
            (selectedPhases.length === 0 ||
              selectedPhases.includes(plan.phase)) &&
            (selectedSplitRatios.length === 0 ||
              selectedSplitRatios.includes(plan.profit_split_ratio)) &&
            (selectedDailyDrawdowns.length === 0 ||
              selectedDailyDrawdowns.includes(plan.daily_drawdown)) &&
            (selectedTotalDrawdowns.length === 0 ||
              selectedTotalDrawdowns.includes(plan.total_drawdown)) &&
            (selectedPrices.length === 0 || selectedPrices.includes(plan.price))
          );
        })
      );
    });
    setFilteredData(filtered);
  };

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
        Compare Firms by Prices
      </h2>
      <PricesFilters
        uniqueFirmTypes={uniqueFirmTypes}
        uniqueAccountSizes={uniqueAccountSizes}
        uniquePhases={uniquePhases}
        uniqueSplitRatios={uniqueSplitRatios}
        uniqueDailyDrawdowns={uniqueDailyDrawdowns}
        uniqueTotalDrawdowns={uniqueTotalDrawdowns}
        uniquePrices={uniquePrices}
        toggleFirmType={toggleFilter(setSelectedFirmTypes)}
        toggleAccountSize={toggleFilter(setSelectedAccountSizes)}
        togglePhase={toggleFilter(setSelectedPhases)}
        toggleSplitRatio={toggleFilter(setSelectedSplitRatios)}
        toggleDailyDrawdown={toggleFilter(setSelectedDailyDrawdowns)}
        toggleTotalDrawdown={toggleFilter(setSelectedTotalDrawdowns)}
        togglePrice={toggleFilter(setSelectedPrices)}
        searchFirms={searchFirms}
        selectedFirmTypes={selectedFirmTypes}
        selectedAccountSizes={selectedAccountSizes}
        selectedPhases={selectedPhases}
        selectedSplitRatios={selectedSplitRatios}
        selectedDailyDrawdowns={selectedDailyDrawdowns}
        selectedTotalDrawdowns={selectedTotalDrawdowns}
        selectedPrices={selectedPrices}
      />
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

Prices.useFirmsProvider = true;
