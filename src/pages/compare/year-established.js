'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { useFirmsContext } from '@/contexts/FirmsProvider';
import RoundButton from '@/components/firms/RoundButton';
import Footer from '../Footer';
import Header from '@/components/Header';
import FirmComparisonTable from '@/components/firms/FirmComparisonTable';
import ExpandableRowDetails from '@/components/firms/ExpandableRowDetails';
import Spinner from '@/components/Spinner';
import useSessionStorage from '@/components/firms/useSessionStorage';

export default function YearEstablished() {
  const { yearEstablished, loading } = useFirmsContext();
  const [selectedYearEstablished, setSelectedYearEstablished] = useState(null);
  const [selectedFirmTypes, setSelectedFirmTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useSessionStorage(
    'selectedYearEstablished',
    selectedYearEstablished,
    setSelectedYearEstablished
  );
  useSessionStorage('filteredData', filteredData, setFilteredData);

  if (loading) {
    return <Spinner />;
  }

  const uniqueFirmTypes = [
    ...new Set(yearEstablished.flatMap((firm) => firm.firm_type)),
  ];

  const toggleFirmType = (option) => {
    setSelectedFirmTypes((prev) =>
      prev.includes(option)
        ? prev.filter((opt) => opt !== option)
        : [...prev, option]
    );
  };

  const toggleYearEstablished = (option) => {
    setSelectedYearEstablished((prev) => (prev === option ? null : option));
  };

  const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffYears = end.getFullYear() - start.getFullYear();
    const diffMonths = end.getMonth() - start.getMonth();

    const totalMonths = diffYears * 12 + diffMonths;
    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    return { diffYears, totalMonths, totalDays };
  };

  const searchFirms = () => {
    setHasSearched(true);

    if (!selectedYearEstablished) {
      setErrorMessage('Please select a year range.');
      setFilteredData([]);
      return;
    }

    setErrorMessage('');

    const currentDate = new Date();
    const threshold = parseInt(selectedYearEstablished.match(/\d+/)?.[0], 10);
    const isAbove = selectedYearEstablished.includes('above');
    const isBelow = selectedYearEstablished.includes('below');

    const result = yearEstablished.filter((firm) => {
      const { diffYears, totalMonths, totalDays } = calculateDateDifference(
        firm.year_established,
        currentDate
      );

      // Compare based on the selected range
      if (isAbove) {
        // Include in "above" if the firm is greater than or equal to the threshold
        return diffYears >= threshold;
      }
      if (isBelow) {
        // Include in "below" if the firm is less than or equal to the threshold
        return diffYears <= threshold;
      }

      // Add specific logic for months and days if needed
      if (selectedYearEstablished.includes('months')) {
        return isAbove ? totalMonths >= threshold : totalMonths <= threshold;
      }

      if (selectedYearEstablished.includes('days')) {
        return isAbove ? totalDays >= threshold : totalDays <= threshold;
      }

      return false;
    });

    setFilteredData(result);
  };

  const compareYearEstablished = [
    'Firms above 8 years',
    'Firms below 8 years',
    'Firms above 5 years',
    'Firms below 5 years',
    'Firms above 2 years',
    'Firms below 2 years',
  ];

  const expandableRenderer = (rowData) => {
    return <ExpandableRowDetails rowData={rowData} />;
  };

  const buttonStyle = {
    marginTop: '4rem',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.1s ease-out',
  };

  const buttonClickedStyle = {
    ...buttonStyle,
    transform: 'scale(0.95)',
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
        <title>Year Established - Compare Firms</title>
        <meta
          name="description"
          content="Compare firms based on their years of operation to find the best match for your needs."
        />
        <meta
          name="keywords"
          content="compare firms based on years of operation, compare firm by establishment year, find firms by age, firm establishment year filter"
        />
      </Head>
      <Header />
      <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        Compare Firms by Years of Operation
      </h1>
      <div style={{ width: '100%', margin: '1rem 0' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Select years of operation:
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          {compareYearEstablished.map((option) => (
            <RoundButton
              key={option}
              option={option}
              isSelected={selectedYearEstablished === option}
              onClick={() => toggleYearEstablished(option)}
              aria-label={`Select ${option}`}
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
              aria-label={`Select firm type: ${option}`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            setIsClicked(true);
            searchFirms();
            setTimeout(() => setIsClicked(false), 200);
          }}
          style={isClicked ? buttonClickedStyle : buttonStyle}
        >
          Search for Firms
        </button>
      </div>
      {errorMessage && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>
      )}
      <div style={{ width: '100%', margin: '1rem 0' }}>
        {filteredData.length > 0 ? (
          <FirmComparisonTable
            filteredData={filteredData}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          hasSearched && <p>No firms match the selected options.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

YearEstablished.useFirmsProvider = true;
