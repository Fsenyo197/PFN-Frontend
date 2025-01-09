import React, { useState } from 'react';
import { useFirmsContext } from '@/contexts/FirmsProvider';
import RoundButton from '@/components/firms/RoundButton';
import Footer from '../Footer';
import Header from '@/components/Header';
import FirmComparisonTable from '@/components/firms/FirmComparisonTable';
import ExpandableRowDetails from '@/components/firms/ExpandableRowDetails';
import Spinner from '@/components/Spinner';
import Head from 'next/head';

export default function Rules() {
  const { rules, loading } = useFirmsContext();
  const [selectedRules, setSelectedRules] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  // Define the human-readable rule names
  const uniqueRules = [
    'Weekend Holding Rule',
    'Consistency Rule',
    'Copy Trading Rule',
    'Two Percent Rule',
    'Stop Loss Rule',
    'VPN/VPS Rule',
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

    if (selectedRules.length === 0) {
      setErrorMessage('No options are selected');
      setFilteredData([]);
      return;
    }

    setErrorMessage('');

    // Filter firms based on selected rules
    const result = rules.filter((firm) =>
      selectedRules.every((rule) => {
        switch (rule) {
          case 'Weekend Holding Rule':
            return firm.weekend_holding_rule === false;
          case 'Consistency Rule':
            return firm.consistency_rule === false;
          case 'Copy Trading Rule':
            return firm.copy_trading_rule === false;
          case 'Two Percent Rule':
            return firm.two_percent_rule === false;
          case 'Stop Loss Rule':
            return firm.stop_loss_rule === false;
          case 'VPN/VPS Rule':
            return firm.vpn_and_vps_rule === false;
          default:
            return true;
        }
      })
    );

    setFilteredData(result);
  };

  const expandableRenderer = (rowData) => {
    return <ExpandableRowDetails rowData={rowData} />;
  };

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
        <title>Trading Rules - Compare Firms</title>
        <meta
          name="description"
          content="Discover and compare firms based on adherence to trading rules, including news trading, consistency, copy trading, and risk management strategies."
        />
        <meta
          name="keywords"
          content="compare firms based on trading rules, trading rule comparison, firms with news trading rule, firms with two percent rule, firms with copy trading rule, firms with consistency rule, firms with stop loss rule, trading risk management"
        />
      </Head>
      <Header />
      <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        Compare Firms by Trading Rules
      </h1>
      <div style={{ width: '100%', margin: '1rem 0' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Select Trading Rules:
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div style={{ width: '100%', margin: '1rem 0' }}>
        {filteredData.length > 0 ? (
          <FirmComparisonTable
            filteredData={filteredData}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          hasSearched &&
          !errorMessage && (
            <p>No firm match the selected trading rule or rules.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

Rules.useFirmsProvider = true;
