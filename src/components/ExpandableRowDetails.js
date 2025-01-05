import React from 'react';
import Link from 'next/link';

const ExpandableRowDetails = ({ rowData }) => {
  // Helper function to format boolean values for rules
  const formatRule = (value) => {
    if (value === true) {
      return 'Yes';
    } else if (value === false) {
      return 'No';
    } else {
      return 'Not Indicated';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
      }}
    >
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Name:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.name}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Firm Type:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.firm_type}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Location:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.location}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Year Established:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.year_established}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Drawdown Type:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.drawdown_type}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Trading Platforms:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.trading_platforms}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>News Rule:</strong>
        </div>
        <div style={valueContainerStyle}>{formatRule(rowData.news_rule)}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Consistency Rule:</strong>
        </div>
        <div style={valueContainerStyle}>
          {formatRule(rowData.consistency_rule)}
        </div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Copy Trading:</strong>
        </div>
        <div style={valueContainerStyle}>
          {formatRule(rowData.copy_trading)}
        </div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>2% Rule:</strong>
        </div>
        <div style={valueContainerStyle}>
          {formatRule(rowData.two_percent_rule)}
        </div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Stop Loss Rule:</strong>
        </div>
        <div style={valueContainerStyle}>
          {formatRule(rowData.stop_loss_rule)}
        </div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Payment Options:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.payment_options}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Payout Options:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.payout_options}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Payout Frequency:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.payout_frequency}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Prohibited Countries:</strong>
        </div>
        <div style={valueContainerStyle}>{rowData.countries_prohibited}</div>
      </div>
      <div style={rowStyle}>
        <div style={labelContainerStyle}>
          <strong>Account Plans:</strong>
        </div>
        <div style={valueContainerStyle}>
          <Link href={`/firm/${rowData.slug}`}>View Account Plans</Link>
        </div>
      </div>
    </div>
  );
};

// Styles for the label and value containers
const rowStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '0.5rem 0',
  flexWrap: 'wrap', // Allow wrapping on smaller screens
};

// Label container style
const labelContainerStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  paddingBottom: '0.5rem',
  minWidth: '150px',
  paddingRight: 8,
  alignItems: 'center',
  textAlign: 'center',
};

// Value container style with vertical connecting line
const valueContainerStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderLeft: '2px solid #ccc',
  paddingLeft: '1rem',
  paddingBottom: '0.5rem',
  minWidth: '150px',
  alignItems: 'center',
  textAlign: 'center',
};
export default ExpandableRowDetails;
