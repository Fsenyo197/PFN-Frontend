"use client";

import React, { createContext, useContext } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  // Include "Home" before "News" in the categories array
  const categories = [
    "Home",
    "News",
    "Prices",
    "Payouts",
    "Rules",
    "Trading Platform",
  ];

  return (
    <HeaderContext.Provider value={{ categories }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
