import React from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";

const CompareByPlatforms = () => {
  const { platforms, loading } = useFirmsContext();

  if (loading) return <p>Loading...</p>;

  if (platforms.length === 0) {
    return <p>No platforms data available to display.</p>;
  }

  const headers = ["Firm Name", "Trading Platforms"];
  const rows = platforms.map((firm) => ({
    name: firm.name,
    trading_platforms: firm.trading_platforms.join(", "),
  }));

  const renderDetails = (row) => (
    <div>
      <p>
        <strong>Details for {row.name}:</strong>
      </p>
      <p>Minimum Balance: {row.min_balance}</p>
      <p>Profit Split: {row.profit_split}</p>
      <p>Other Rule: {row.other_rule}</p>
    </div>
  );

  return (
    <div>
      <h2>Compare by Platforms</h2>
      <GenericTable
        headers={headers}
        rows={rows}
        rowKey={(row) => row.name}
        renderDetails={renderDetails}
      />
    </div>
  );
};

CompareByPlatforms.useFirmsProvider = true;

export default CompareByPlatforms;
