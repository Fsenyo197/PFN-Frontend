import React, { useState } from 'react';
import { useFirmsContext } from '@/contexts/FirmsProvider';
import Header from '@/components/Header';
import Footer from '@/pages/Footer';
import RoundButton from '@/components/firms/RoundButton';
import FirmComparisonTable from '@/components/firms/FirmComparisonTable';
import ExpandableRowDetails from '@/components/firms/ExpandableRowDetails';
import Spinner from '@/components/Spinner';
import Head from 'next/head';
import useSessionStorage from '@/components/firms/useSessionStorage';

export default function BestChoices() {
  const { bestChoices, loading } = useFirmsContext();

  const [filters, setFilters] = useState({
    firmType: [],
    phase: [],
    accountSize: [],
    dailyDrawdown: [],
    totalDrawdown: [],
    price: [],
  });
  useSessionStorage('filters', filters, setFilters);

  const handleFilterChange = (filterKey, selected) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey].includes(selected)
        ? prev[filterKey].filter((opt) => opt !== selected)
        : [...prev[filterKey], selected],
    }));
  };

  const filterData = (data, filters) => {
    let filteredData = data;

    if (filters.firmType.length) {
      filteredData = filteredData.filter((firm) =>
        filters.firmType.includes(firm.firm_type)
      );
    }

    if (filters.phase.length) {
      filteredData = filteredData.filter((firm) =>
        firm.account_plans.some((plan) =>
          filters.phase.includes(plan.phase.replace(/_/g, ' '))
        )
      );
    }

    if (filters.accountSize.length) {
      filteredData = filteredData.filter((firm) =>
        firm.account_plans.some((plan) =>
          filters.accountSize.includes(plan.account_size)
        )
      );
    }

    if (filters.dailyDrawdown.length) {
      filteredData = filteredData.filter((firm) =>
        firm.account_plans.some((plan) =>
          filters.dailyDrawdown.includes(plan.daily_drawdown)
        )
      );
    }

    if (filters.totalDrawdown.length) {
      filteredData = filteredData.filter((firm) =>
        firm.account_plans.some((plan) =>
          filters.totalDrawdown.includes(plan.total_drawdown)
        )
      );
    }

    if (filters.price.length) {
      filteredData = filteredData.filter((firm) =>
        firm.account_plans.some((plan) => filters.price.includes(plan.price))
      );
    }

    return filteredData;
  };

  const generateValidOptions = (data) => {
    return {
      firmType: [...new Set(data.map((firm) => firm.firm_type))].sort(),
      phase: [
        ...new Set(
          data.flatMap((firm) =>
            firm.account_plans.map((plan) => plan.phase.replace(/_/g, ' '))
          )
        ),
      ].sort(),
      accountSize: [
        ...new Set(
          data.flatMap((firm) =>
            firm.account_plans.map((plan) => plan.account_size)
          )
        ),
      ].sort(),
      dailyDrawdown: [
        ...new Set(
          data.flatMap((firm) =>
            firm.account_plans.map((plan) => plan.daily_drawdown)
          )
        ),
      ].sort(),
      totalDrawdown: [
        ...new Set(
          data.flatMap((firm) =>
            firm.account_plans.map((plan) => plan.total_drawdown)
          )
        ),
      ].sort(),
      price: [
        ...new Set(
          data.flatMap((firm) => firm.account_plans.map((plan) => plan.price))
        ),
      ].sort(),
    };
  };

  const filteredData = filterData(bestChoices, filters);
  const validOptions = generateValidOptions(filteredData);

  if (loading) {
    return <Spinner />;
  }

  const FilterGroup = ({ title, options, onChange, selected }) => (
    <div style={{ margin: '1rem 0' }}>
      <h3>{title}</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {options.map((option) => (
          <RoundButton
            key={option}
            option={option}
            isSelected={selected.includes(option)}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );

  const PricesFilters = () => (
    <div style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '2rem' }}>
      {Object.entries(validOptions).map(([filterKey, options]) => (
        <FilterGroup
          key={filterKey}
          title={filterKey.replace(/([A-Z])/g, ' $1')}
          options={options}
          onChange={(selected) => handleFilterChange(filterKey, selected)}
          selected={filters[filterKey]}
        />
      ))}
      <button
        style={{
          marginTop: '4rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'transform 0.1s ease-out',
        }}
        onClick={() =>
          setFilters({
            firmType: [],
            phase: [],
            accountSize: [],
            dailyDrawdown: [],
            totalDrawdown: [],
            price: [],
          })
        }
      >
        Reset Filters
      </button>
    </div>
  );

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
        <title>
          Best Prop Firms - Compare and Choose the Best Trading Firm
        </title>
        <meta
          name="description"
          content="Discover the best prop firms tailored to your needs. Compare top proprietary trading firms, pricing, and features to make the best choice for your trading journey."
        />
        <meta
          name="keywords"
          content="best prop firms, compare prop trading platforms, top proprietary trading firms, best trading firm comparison, choose the best trading firm"
        />
      </Head>
      <Header />
      <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        Filter Your Ideal Firm
      </h1>
      <PricesFilters />
      <div style={{ width: '100%', margin: '1rem 0' }}>
        {filteredData.length > 0 ? (
          <FirmComparisonTable
            filteredData={filteredData}
            expandableRenderer={expandableRenderer}
          />
        ) : (
          <p>No firms match the selected filters. Adjust your criteria.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

BestChoices.useFirmsProvider = true;
