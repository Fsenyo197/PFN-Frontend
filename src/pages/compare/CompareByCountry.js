import React from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";

const CompareByCountry = () => {
  const { country, loading } = useFirmsContext();

  if (loading) return <p>Loading...</p>;

  if (country.length === 0) {
    return <p>No firms data available to display.</p>;
  }

  const headers = ["Firm Name", "Country"];
  const rows = country.map((firm) => ({
    name: firm.name,
    location: firm.location,
  }));

  const renderDetails = (row) => (
    <div>
      <p>
        <strong>Details for {row.name}:</strong>
      </p>
      <p>
        Additional information about the firm’s country of operation can go
        here.
      </p>
    </div>
  );

  return (
    <div>
      <h2>Compare by Country</h2>
      <GenericTable
        headers={headers}
        rows={rows}
        rowKey={(row) => row.name}
        renderDetails={renderDetails}
      />
    </div>
  );
};

CompareByCountry.useFirmsProvider = true;

export default CompareByCountry;
