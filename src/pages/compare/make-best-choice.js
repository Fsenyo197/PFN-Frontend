"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "../Footer";
import Platforms from "@/pages/compare/platforms";
import Prices from "@/pages/compare/prices";
import PayoutOptions from "@/pages/compare/payout-options";
import Rules from "@/pages/compare/rules";
import Country from "@/pages/compare/country";
import YearEstablished from "@/pages/compare/year-established";

export default function MakeBestChoice() {
  const [view, setView] = useState("platforms"); // Default view

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Header />
      <h2 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Make the Best Choice
      </h2>
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => setView("platforms")}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: view === "platforms" ? "#02353C" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Compare by Platforms
        </button>
        <button
          onClick={() => setView("prices")}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: view === "prices" ? "#02353C" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Compare by Prices
        </button>
        <button
          onClick={() => setView("payout-options")}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: view === "payout-options" ? "#02353C" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Compare by Payout Options
        </button>
        <button
          onClick={() => setView("rules")}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: view === "rules" ? "#02353C" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Compare by Rules
        </button>
        <button
          onClick={() => setView("country")}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: view === "country" ? "#02353C" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Compare by Country
        </button>
        <button
          onClick={() => setView("year-established")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: view === "year-established" ? "#02353C" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Compare by Year Established
        </button>
      </div>
      {view === "platforms" && <Platforms />}
      {view === "prices" && <Prices />}
      {view === "payout-options" && <PayoutOptions />}
      {view === "rules" && <Rules />}
      {view === "country" && <Country />}
      {view === "year-established" && <YearEstablished />}
      <Footer />
    </div>
  );
}
