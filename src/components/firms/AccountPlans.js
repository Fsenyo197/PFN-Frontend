import React from 'react';

const AccountPlans = ({ accountPlans }) => {
  return (
    <div
      style={{
        marginTop: '1rem',
        borderTop: '2px solid #ccc',
        paddingTop: '1rem',
      }}
    >
      <strong>Account Plans</strong>
      {accountPlans && accountPlans.length > 0 ? (
        accountPlans.map((plan, index) => (
          <div
            key={index}
            style={{
              marginBottom: '1rem',
              borderBottom: '1px solid #ccc',
              paddingBottom: '1rem',
            }}
          >
            {/* Plan Title */}
            <div>
              {plan.phase.charAt(0).toUpperCase() +
                plan.phase.slice(1).replace(/_/g, ' ')}{' '}
              : {plan.account_size} {plan.account_type} Account Size
            </div>

            {/* Plan Details */}
            {plan.price && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Price:</div>
                <div style={valueContainerStyle}>
                  {plan.price} {plan.currency}
                </div>
              </div>
            )}
            {plan.profit_split_ratio && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Profit Split Ratio:</div>
                <div style={valueContainerStyle}>{plan.profit_split_ratio}</div>
              </div>
            )}
            {plan.daily_drawdown && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Daily Drawdown:</div>
                <div style={valueContainerStyle}>{plan.daily_drawdown}</div>
              </div>
            )}
            {plan.total_drawdown && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Total Drawdown:</div>
                <div style={valueContainerStyle}>{plan.total_drawdown}</div>
              </div>
            )}
            {plan.leverage && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Leverage:</div>
                <div style={valueContainerStyle}>{plan.leverage}</div>
              </div>
            )}
            {plan.minimum_trading_days && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Minimum Trading Days:</div>
                <div style={valueContainerStyle}>
                  {plan.minimum_trading_days}
                </div>
              </div>
            )}
            {plan.phase_time_limit && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Phase Time Limit:</div>
                <div style={valueContainerStyle}>{plan.phase_time_limit}</div>
              </div>
            )}
            {plan.profit_target && (
              <div style={rowStyle}>
                <div style={labelContainerStyle}>Profit Target:</div>
                <div style={valueContainerStyle}>{plan.profit_target}</div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No account plans available.</p>
      )}
    </div>
  );
};

// Styles
const rowStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '0.5rem 0',
  flexWrap: 'wrap',
};

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

export default AccountPlans;
