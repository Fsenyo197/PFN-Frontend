import React, { useState } from 'react';
import { useFirmsContext } from '@/contexts/FirmsProvider';
import RoundButton from '@/components/firms/RoundButton';
import Footer from '../Footer';
import Header from '@/components/Header';
import FirmComparisonTable from '@/components/firms/FirmComparisonTable';
import ExpandableRowDetails from '@/components/firms/ExpandableRowDetails';
import Spinner from '@/components/Spinner';
import Head from 'next/head';
import useSessionStorage from '@/components/firms/useSessionStorage';

export default function Platforms() {
  const { platforms, loading } = useFirmsContext();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedFirmTypes, setSelectedFirmTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [noMatchReasons, setNoMatchReasons] = useState([]);

  useSessionStorage(
    'selectedPlatforms',
    selectedPlatforms,
    setSelectedPlatforms
  );
  useSessionStorage('filteredData', filteredData, setFilteredData);

  if (loading) {
    return <Spinner />;
  }

  const uniqueTradingPlatforms = [
    ...new Set(platforms.flatMap((firm) => firm.trading_platforms)),
  ];
  const uniqueFirmTypes = [
    ...new Set(platforms.flatMap((firm) => firm.firm_type)),
  ];

  const toggleFirmType = (option) => {
    setSelectedFirmTypes((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const togglePlatform = (option) => {
    setSelectedPlatforms((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const searchFirms = () => {
    setHasSearched(true);

    // Filter platforms and firm types
    const platformMatches = platforms.filter(
      (firm) =>
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) =>
          firm.trading_platforms.includes(platform)
        )
    );

    const firmTypeMatches = platformMatches.filter(
      (firm) =>
        selectedFirmTypes.length === 0 ||
        selectedFirmTypes.includes(firm.firm_type)
    );

    const reasons = [];
    if (selectedPlatforms.length > 0 && firmTypeMatches.length === 0)
      reasons.push('trading platform(s)');
    if (selectedFirmTypes.length > 0 && firmTypeMatches.length === 0)
      reasons.push('firm type(s)');

    setNoMatchReasons(reasons);
    setFilteredData(firmTypeMatches);
  };

  const expandableRenderer = (rowData) => (
    <ExpandableRowDetails rowData={rowData} />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Head>
        <title>Trading Platforms - Compare Firms</title>
        <meta
          name="description"
          content="Compare firms based on the trading platforms they support, including popular platforms such as MetaTrader, cTrader, and proprietary solutions."
        />
        <meta
          name="keywords"
          content="compare firms by trading platforms, MetaTrader firms comparison, firms using DXTrader, firms using Match Trader, firms using MT5, firms using MT4, firms using cTrader, multi-platform trading firms"
        />
      </Head>
      <Header />
      <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        Compare Firms by Trading Platforms
      </h1>
      <div style={{ width: '100%', margin: '1rem 0' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Select Trading Platforms:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
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
            backgroundColor: '#000',
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
      <div style={{ width: '100%', margin: '1rem 0' }}>
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
                <p style={{ color: 'red' }}>
                  {noMatchReasons.includes('No option selected')
                    ? 'No option selected.'
                    : `Check the selected ${noMatchReasons.join(', ')}.`}
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

Platforms.useFirmsProvider = true;
