import React, { useState } from "react";
import { Box, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        boxShadow: "none",
        border: "1px solid #d3d3d3",
        borderRadius: 1,
      }}
    >
      <InputBase
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        sx={{
          ml: 2,
          flex: 1,
          fontSize: "1.2rem",
        }}
        inputProps={{ "aria-label": "search" }}
      />
      {searchQuery && (
        <IconButton onClick={handleClear} aria-label="clear" sx={{ p: "10px" }}>
          <ClearIcon />
        </IconButton>
      )}
      <IconButton
        type="submit"
        aria-label="search"
        sx={{
          p: "10px",
          backgroundColor: "#000",
          borderRadius: 0,
          "&:hover": { backgroundColor: "#333" },
        }}
      >
        <SearchIcon sx={{ color: "#fff" }} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
