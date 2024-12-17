import React, { useState } from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import Header from "@/components/Header";
import Footer from "../Footer";
import PricesFilters from "@/components/PricesFilters";
import FirmComparisonTable from "@/components/FirmComparisonTable";
import ExpandableRowDetails from "@/components/ExpandableRowDetails";
import Spinner from "@/components/Spinner";

export default function BestChoices() {
  const { bestChoices, loading } = useFirmsContext();
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedFirmTypes, setSelectedFirmTypes] = useState([]);
  const [selectedAccountSizes, setSelectedAccountSizes] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedPayouts, setSelectedPayouts] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [selectedSplitRatios, setSelectedSplitRatios] = useState([]);
  const [selectedDailyDrawdowns, setSelectedDailyDrawdowns] = useState([]);
  const [selectedTotalDrawdowns, setSelectedTotalDrawdowns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [noMatchReasons, setNoMatchReasons] = useState([]);

  if (loading) {
    return <Spinner />;
  }

  // Define unique options
  const uniqueFirmTypes = [
    ...new Set(bestChoices.flatMap((firm) => firm.firm_type)),
  ];
  const uniqueRules = [
    "News Trading Rule",
    "Consistency Rule",
    "Copy Trading",
    "Two Percent Rule",
    "Stop Loss Rule",
  ];
  const uniquePlatforms = [
    ...new Set(bestChoices.flatMap((firm) => firm.trading_platforms)),
  ];
  const uniquePayoutOptions = [
    ...new Set(bestChoices.flatMap((firm) => firm.payout_options)),
  ];
  const uniqueAccountSizes = [
    ...new Set(
      bestChoices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.account_size)
      )
    ),
  ];
  const uniquePhases = [
    ...new Set(
      bestChoices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.phase)
      )
    ),
  ];
  const uniquePrices = [
    ...new Set(
      bestChoices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.price)
      )
    ),
  ];
  const uniqueSplitRatios = [
    ...new Set(
      bestChoices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.profit_split_ratio)
      )
    ),
  ];
  const uniqueDailyDrawdowns = [
    ...new Set(
      bestChoices.flatMap((firm) =>
        firm.account_plans?.map((plan) => plan.daily_drawdown)
      )
    ),
  ];
  const uniqueTotalDrawdowns = [
    ...new Set(
      bestChoices.flatMap((firm) =>
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
    let reasons = [];

    // Early exit if no filters are applied
    const hasFiltersApplied = [
      selectedFirmTypes,
      selectedAccountSizes,
      selectedPhases,
      selectedSplitRatios,
      selectedDailyDrawdowns,
      selectedTotalDrawdowns,
      selectedPlatforms,
      selectedRules,
      selectedPayouts,
      selectedPrices,
    ].some((filter) => filter.length > 0);

    if (!hasFiltersApplied) {
      setNoMatchReasons(["No option selected"]);
      setFilteredData([]);
      return;
    }

    // Filter based on rules first
    const firmsAfterRulesFilter = bestChoices.filter((firm) =>
      selectedRules.every((rule) => {
        switch (rule) {
          case "News Trading Rule":
            return firm.news_rule === false;
          case "Consistency Rule":
            return firm.consistency_rule === false;
          case "Copy Trading":
            return firm.copy_trading === false;
          case "Two Percent Rule":
            return firm.two_percent_rule === false;
          case "Stop Loss Rule":
            return firm.stop_loss_rule === false;
          default:
            return true;
        }
      })
    );

    // Apply the rest of the filters
    const filtered = firmsAfterRulesFilter.filter((firm) => {
      const firmMatches =
        selectedFirmTypes.length === 0 ||
        selectedFirmTypes.includes(firm.firm_type);

      const platformMatches =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) =>
          firm.trading_platforms.includes(platform)
        );

      const payoutMatches =
        selectedPayouts.length === 0 ||
        selectedPayouts.some((payout) => firm.payout_options.includes(payout));

      const accountPlanMatches = firm.account_plans.some((plan) => {
        const accountMatches =
          selectedAccountSizes.length === 0 ||
          selectedAccountSizes.includes(plan.account_size);

        const phaseMatches =
          selectedPhases.length === 0 || selectedPhases.includes(plan.phase);

        const splitRatioMatches =
          selectedSplitRatios.length === 0 ||
          selectedSplitRatios.includes(plan.profit_split_ratio);

        const dailyDrawdownMatches =
          selectedDailyDrawdowns.length === 0 ||
          selectedDailyDrawdowns.includes(plan.daily_drawdown);

        const totalDrawdownMatches =
          selectedTotalDrawdowns.length === 0 ||
          selectedTotalDrawdowns.includes(plan.total_drawdown);

        const priceMatches =
          selectedPrices.length === 0 || selectedPrices.includes(plan.price);

        // Collect reasons for no match
        if (!accountMatches) reasons.push("account size");
        if (!phaseMatches) reasons.push("phases");
        if (!splitRatioMatches) reasons.push("split ratio");
        if (!dailyDrawdownMatches) reasons.push("daily drawdown");
        if (!totalDrawdownMatches) reasons.push("total drawdown");
        if (!priceMatches) reasons.push("prices");

        return (
          accountMatches &&
          phaseMatches &&
          splitRatioMatches &&
          dailyDrawdownMatches &&
          totalDrawdownMatches &&
          priceMatches
        );
      });

      if (!firmMatches && selectedFirmTypes.length > 0)
        reasons.push("firm type");
      if (!platformMatches && selectedPlatforms.length > 0)
        reasons.push("platforms");
      if (!payoutMatches && selectedPayouts.length > 0)
        reasons.push("payout options");

      return (
        firmMatches && platformMatches && payoutMatches && accountPlanMatches
      );
    });

    // Handle no match
    setNoMatchReasons([...new Set(reasons)]);
    setFilteredData(filtered);
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
      <Header />
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Make the best choice
      </h2>
      <PricesFilters
        uniqueFirmTypes={uniqueFirmTypes}
        uniquePlatforms={uniquePlatforms}
        uniquePayoutOptions={uniquePayoutOptions}
        uniqueRules={uniqueRules}
        uniquePhases={uniquePhases}
        uniqueAccountSizes={uniqueAccountSizes}
        uniqueSplitRatios={uniqueSplitRatios}
        uniqueDailyDrawdowns={uniqueDailyDrawdowns}
        uniqueTotalDrawdowns={uniqueTotalDrawdowns}
        uniquePrices={uniquePrices}
        toggleFirmType={toggleFilter(setSelectedFirmTypes)}
        togglePlatform={toggleFilter(setSelectedPlatforms)}
        togglePayout={toggleFilter(setSelectedPayouts)}
        toggleRule={toggleFilter(setSelectedRules)}
        togglePhase={toggleFilter(setSelectedPhases)}
        toggleAccountSize={toggleFilter(setSelectedAccountSizes)}
        toggleSplitRatio={toggleFilter(setSelectedSplitRatios)}
        toggleDailyDrawdown={toggleFilter(setSelectedDailyDrawdowns)}
        toggleTotalDrawdown={toggleFilter(setSelectedTotalDrawdowns)}
        togglePrice={toggleFilter(setSelectedPrices)}
        searchFirms={searchFirms}
        selectedFirmTypes={selectedFirmTypes}
        selectedPlatforms={selectedPlatforms}
        selectedPayouts={selectedPayouts}
        selectedRules={selectedRules}
        selectedPhases={selectedPhases}
        selectedAccountSizes={selectedAccountSizes}
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
          hasSearched && (
            <div>
              <p>No firm matches the selected option or options.</p>
              {noMatchReasons.length > 0 && (
                <p style={{ color: "red" }}>
                  {noMatchReasons.includes("No option selected")
                    ? "No option selected."
                    : `Check ${noMatchReasons.join(", ")}.`}
                </p>
              )}
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

BestChoices.useFirmsProvider = true;
