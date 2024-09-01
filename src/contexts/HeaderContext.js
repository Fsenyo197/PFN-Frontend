"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import FetchCategories from "../utils/FetchCategories";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    FetchCategories().then((data) => setCategories(data));
  }, []);

  return (
    <HeaderContext.Provider value={{ categories, isDarkMode, toggleTheme }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
