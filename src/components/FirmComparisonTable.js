import React from 'react';
import GenericTable from '@/components/GenericTable';

const FirmComparisonTable = ({ filteredData, expandableRenderer }) => {
  const columns = [
    {
      key: 'name',
      label: 'Firm Name',
      render: (value, row) => (
        <div>
          <div>{value}</div>
          {row.website && (
            <a
              href={row.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.85em', color: 'blue' }}
            >
              {row.website}
            </a>
          )}
        </div>
      ),
    },
    {
      key: 'news_rule',
      label: 'News Trading Rule',
      render: (value) => (value === true ? 'Yes' : 'No'),
    },
    {
      key: 'consistency_rule',
      label: 'Consistency Rule',
      render: (value) => (value === true ? 'Yes' : 'No'),
    },
    {
      key: 'copy_trading',
      label: 'Copy Trading',
      render: (value) => (value === true ? 'Yes' : 'No'),
    },
    {
      key: 'two_percent_rule',
      label: 'Two Percent Rule',
      render: (value) => (value === true ? 'Yes' : 'No'),
    },
    {
      key: 'stop_loss_rule',
      label: 'Stop Loss Rule',
      render: (value) => (value === true ? 'Yes' : 'No'),
    },
    { key: 'location', label: 'Location' },
    { key: 'year_established', label: 'Year Established' },
  ];

  const data = filteredData.map((firm) => ({
    id: firm.id,
    name: firm.name,
    news_rule: firm.news_rule,
    consistency_rule: firm.consistency_rule,
    copy_trading: firm.copy_trading,
    two_percent_rule: firm.two_percent_rule,
    location: firm.location,
    year_established: firm.year_established,
    firm_type: firm.firm_type,
    payment_options: firm.payment_options.join(', '),
    payout_options: firm.payout_options.join(', '),
    trading_platforms: firm.trading_platforms.join(', '),
    countries_prohibited: firm.countries_prohibited.join(', '),
    drawdown_type: firm.drawdown_type,
    stop_loss_rule: firm.stop_loss_rule,
    payout_frequency: firm.payout_frequency,
    account_plans: firm.account_plans,
    website: firm.website,
  }));

  return (
    <div style={{ width: '100%', margin: '1rem 0' }}>
      <GenericTable
        columns={columns}
        data={data}
        expandableRenderer={expandableRenderer}
      />
    </div>
  );
};

export default FirmComparisonTable;
