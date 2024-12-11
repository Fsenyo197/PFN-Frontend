import React from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";

const Price = () => {
  const { price, loading } = useFirmsContext();

  if (loading) return <p>Loading...</p>;

  if (price.length === 0) {
    return <p>No price data available to display.</p>;
  }

  const headers = ["Firm Name", "Price"];
  const rows = price.map((firm) => ({
    name: firm.name,
    price: firm.price,
  }));

  const renderDetails = (row) => (
    <div>
      <p>
        <strong>Details for {row.name}:</strong>
      </p>
      <p>Minimum Balance: {row.min_balance}</p>
      <p>Profit Split: {row.profit_split}</p>
      <p>Other Details: {row.other_details}</p>
    </div>
  );

  return (
    <div>
      <h2>Compare by Price</h2>
      <GenericTable
        headers={headers}
        rows={rows}
        rowKey={(row) => row.name}
        renderDetails={renderDetails}
      />
    </div>
  );
};

Price.useFirmsProvider = true;

export default Price;
