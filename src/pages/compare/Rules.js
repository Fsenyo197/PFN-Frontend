import React from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";

const Rules = () => {
  const { rules, loading } = useFirmsContext();

  if (loading) return <p>Loading...</p>;

  if (rules.length === 0) {
    return <p>No rules data available to display.</p>;
  }

  const headers = ["Firm Name", "Consistency Rule", "Two Percent Rule"];
  const rows = rules.map((firm) => ({
    name: firm.name,
    consistency_rule: firm.consistency_rule ? "Yes" : "No",
    two_percent_rule: firm.two_percent_rule ? "Yes" : "No",
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
      <h2>Compare by Rules</h2>
      <GenericTable
        headers={headers}
        rows={rows}
        rowKey={(row) => row.name}
        renderDetails={renderDetails}
      />
    </div>
  );
};

Rules.useFirmsProvider = true;

export default Rules;
