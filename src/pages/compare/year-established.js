'use client';

import React, { useState } from 'react';
import Head from 'next/head'; // Import Head
import { useFirmsContext } from '@/contexts/FirmsProvider';
import RoundButton from '@/components/firms/RoundButton';
import Footer from '../Footer';
import Header from '@/components/Header';
import FirmComparisonTable from '@/components/firms/FirmComparisonTable';
import ExpandableRowDetails from '@/components/firms/ExpandableRowDetails';
import Spinner from '@/components/Spinner';

export default function YearEstablished() {
  const { yearEstablished, loading } = useFirmsContext();
  const [selectedYearEstablished, setSelectedYearEstablished] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  if (loading) {
    return <Spinner />;
  }

  const toggleYearEstablished = (option) => {
    setSelectedYearEstablished((prev) => (prev === option ? null : option));
  };

  const searchFirms = () => {
    setHasSearched(true);

    if (!selectedYearEstablished) {
      setErrorMessage('No options are selected');
      setFilteredData([]);
      return;
    }

    setErrorMessage(''); // Clear any previous error messages

    const result = yearEstablished.filter((firm) => {
      const yearsDiff = new Date().getFullYear() - firm.year_established;
      if (selectedYearEstablished.includes('above')) {
        const threshold = parseInt(selectedYearEstablished.split(' ')[2], 10);
        return yearsDiff > threshold;
      }
      if (selectedYearEstablished.includes('below')) {
        const threshold = parseInt(selectedYearEstablished.split(' ')[2], 10);
        return yearsDiff < threshold;
      }
      return false;
    });

    setFilteredData(result);
  };

  const compareyearEstablished = [
    'Firms above 5 years',
    'Firms below 5 years',
    'Firms above 4 years',
    'Firms below 4 years',
    'Firms above 3 years',
    'Firms below 3 years',
    'Firms above 2 years',
    'Firms below 2 years',
  ];

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
        <title>Year Established - Compare Firms</title>
        <meta
          name="description"
          content="Compare firms based on their years of operation to find the best match for your needs."
        />
        <meta
          name="keywords"
          content="compare firms based on years of operation, compare firm by establishment year, find firms by age, firm establishment year filter,"
        />
      </Head>
      <Header />
      <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        Compare Firms by years of operation
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
            <p>No firm match the selected years of establishment.</p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

YearEstablished.useFirmsProvider = true;
