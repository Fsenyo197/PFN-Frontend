"use client";

import React, { createContext, useContext } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const categories = [
    "Home",
    "Prop News",
    "Payouts",
    "Trading Rules",
    "Prop Firms",
    "Discount Codes",
    {
      name: "Compare Firms",
      subcategories: [
        { name: "By Country", path: "/compare/Country" },
        { name: "By Payout Options", path: "/compare/PayoutOptions" },
        { name: "By Platforms", path: "/compare/Platforms" },
        { name: "By Established Year", path: "/compare/YearEstablished" },
        { name: "By Rules", path: "/compare/Rules" },
        { name: "By Price", path: "/compare/Price" },
      ],
    },
  ];

  return (
    <HeaderContext.Provider value={{ categories }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
