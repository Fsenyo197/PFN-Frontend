import React from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";

const CompareByPayoutOptions = () => {
  const { payoutOptions, loading } = useFirmsContext();

  if (loading) return <p>Loading...</p>;

  if (payoutOptions.length === 0) {
    return <p>No payout options data available to display.</p>;
  }

  const headers = ["Firm Name", "Payout Options"];
  const rows = payoutOptions.map((firm) => ({
    name: firm.name,
    payout_options: firm.payout_options.join(", "),
  }));

  const renderDetails = (row) => (
    <div>
      <p>
        <strong>Details for {row.name}:</strong>
      </p>
      <p>Additional information about payout options can go here.</p>
    </div>
  );

  return (
    <div>
      <h2>Compare by Payout Options</h2>
      <GenericTable
        headers={headers}
        rows={rows}
        rowKey={(row) => row.name}
        renderDetails={renderDetails}
      />
    </div>
  );
};

CompareByPayoutOptions.useFirmsProvider = true;

export default CompareByPayoutOptions;
