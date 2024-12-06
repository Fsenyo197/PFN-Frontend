"use client";

import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "../Footer";

const CompareFirms = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug)
    return (
      <>
        <Header />
        <div>Loading...</div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      {slug === "Country" && <div>Compare Firms By Country</div>}
      {slug === "PayoutOptions" && <div>Compare Firms By Payout Options</div>}
      {slug === "Platforms" && <div>Compare Firms By Platforms</div>}
      {slug === "EstablishedYear" && (
        <div>Compare Firms By Established Year</div>
      )}
      {slug === "Rules" && <div>Compare Firms By Rules</div>}
      {slug === "Price" && <div>Compare Firms By Price</div>}
      <Footer />
    </>
  );
};

export default CompareFirms;
