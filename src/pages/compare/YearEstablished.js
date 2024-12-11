import React from "react";
import { useFirmsContext } from "@/contexts/FirmsProvider";
import GenericTable from "@/components/GenericTable";

const YearEstablished = () => {
  const { establishedYear, loading } = useFirmsContext();

  if (loading) return <p>Loading...</p>;

  if (establishedYear.length === 0) {
    return <p>No year established data available to display.</p>;
  }

  const headers = ["Firm Name", "Year Established"];
  const rows = establishedYear.map((firm) => ({
    name: firm.name,
    year_established: firm.year_established,
  }));

  const renderDetails = (row) => (
    <div>
      <p>
        <strong>Details for {row.name}:</strong>
      </p>
      <p>Additional information about this firm can go here.</p>
    </div>
  );

  return (
    <div>
      <h2>Compare by Year Established</h2>
      <GenericTable
        headers={headers}
        rows={rows}
        rowKey={(row) => row.name}
        renderDetails={renderDetails}
      />
    </div>
  );
};

YearEstablished.useFirmsProvider = true;

export default YearEstablished;
