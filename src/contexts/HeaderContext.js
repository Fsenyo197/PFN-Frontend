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
        { name: "By Country" },
        { name: "By Payout Options" },
        { name: "By Platforms" },
        { name: "By Established Year" },
        { name: "By Rules" },
        { name: "By Price" },
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
