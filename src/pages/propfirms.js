import React, { useEffect, useState } from "react";
import fetchPropFirms from "@/utils/fetchPropFirms";
import CompareByRules from "@/components/CompareByRules";
import CompareByPrice from "@/components/CompareByPrice";
import CompareByPlatforms from "@/components/CompareByPlatforms";
import CompareByCountry from "@/components/CompareByCountry";
import CompareByPayoutOptions from "@/components/CompareByPayoutOptions";
import CompareByYearEstablished from "@/components/CompareByYearEstablished";

export default function PropFirms() {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPropFirms = async () => {
      try {
        const data = await fetchPropFirms();
        setFirms(data);
      } catch (error) {
        setError("Failed to fetch prop firms.");
      } finally {
        setLoading(false);
      }
    };
    getPropFirms();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Prop Firms Comparison</h1>
      <CompareByRules firms={firms} />
      <CompareByPrice firms={firms} />
      <CompareByPlatforms firms={firms} />
      <CompareByCountry firms={firms} />
      <CompareByPayoutOptions firms={firms} />
      <CompareByYearEstablished firms={firms} />
    </div>
  );
}
