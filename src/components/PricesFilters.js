import React, { useState } from "react";
import RoundButton from "@/components/RoundButton";

export default function PricesFilters({
  uniqueFirmTypes,
  uniqueAccountSizes,
  uniquePhases,
  uniquePlatforms,
  uniquePayoutOptions,
  uniqueRules,
  uniqueSplitRatios,
  uniqueDailyDrawdowns,
  uniqueTotalDrawdowns,
  uniquePrices,
  toggleFirmType,
  toggleAccountSize,
  togglePhase,
  togglePlatform,
  togglePayout,
  toggleRule,
  toggleSplitRatio,
  toggleDailyDrawdown,
  toggleTotalDrawdown,
  togglePrice,
  searchFirms,
  selectedFirmTypes,
  selectedAccountSizes,
  selectedPhases,
  selectedPlatforms,
  selectedPayouts,
  selectedRules,
  selectedSplitRatios,
  selectedDailyDrawdowns,
  selectedTotalDrawdowns,
  selectedPrices,
}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div style={{ width: "100%", margin: "1rem 0" }}>
      <div>
        <h4>Select Firm Types:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueFirmTypes.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedFirmTypes.includes(option)}
              onClick={() => toggleFirmType(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Platforms:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniquePlatforms.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedPlatforms.includes(option)}
              onClick={() => togglePlatform(option)}
            />
          ))}
        </div>
      </div>
      <div>
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
              isSelected={selectedPayouts.includes(option)}
              onClick={() => togglePayout(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Rules:</h4>
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
      </div>
      <div>
        <h4>Select Phases:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniquePhases.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedPhases.includes(option)}
              onClick={() => togglePhase(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Account Sizes:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueAccountSizes.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedAccountSizes.includes(option)}
              onClick={() => toggleAccountSize(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Split Ratios:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueSplitRatios.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedSplitRatios.includes(option)}
              onClick={() => toggleSplitRatio(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Daily Drawdowns:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueDailyDrawdowns.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedDailyDrawdowns.includes(option)}
              onClick={() => toggleDailyDrawdown(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Total Drawdowns:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniqueTotalDrawdowns.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedTotalDrawdowns.includes(option)}
              onClick={() => toggleTotalDrawdown(option)}
            />
          ))}
        </div>
      </div>
      <div>
        <h4>Select Prices:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {uniquePrices.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedPrices.includes(option)}
              onClick={() => togglePrice(option)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          setIsClicked(true);
          searchFirms();
          setTimeout(() => setIsClicked(false), 200);
        }}
        style={{
          marginTop: "4rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#02353C",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transform: isClicked ? "scale(0.95)" : "scale(1)",
          transition: "transform 0.1s ease-out",
        }}
      >
        Search for firms
      </button>
    </div>
  );
}
