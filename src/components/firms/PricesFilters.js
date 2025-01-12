import React, { useState } from 'react';
import RoundButton from '@/components/firms/RoundButton';

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
    <div style={{ width: '100%', margin: '1rem 0' }}>
      <div>
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Firm Types:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Platforms:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Payout Options:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Rules:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Phases:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Account Sizes:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Split Ratios:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Daily Drawdowns:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Total Drawdowns:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
        <p
          style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '2rem' }}
        >
          Select Prices:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
          marginTop: '4rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#000000',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transform: isClicked ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        Search for firms
      </button>
    </div>
  );
}
