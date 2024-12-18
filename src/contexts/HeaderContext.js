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
        { name: "By Country", path: "/compare/country" },
        { name: "By Payout Options", path: "/compare/payout-options" },
        { name: "By Platforms", path: "/compare/platforms" },
        { name: "By Established Year", path: "/compare/year-established" },
        { name: "By Rules", path: "/compare/rules" },
        { name: "Make Best Choices", path: "/compare/best-choices" },
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
