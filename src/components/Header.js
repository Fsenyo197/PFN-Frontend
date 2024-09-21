import * as React from "react";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHeader } from "../contexts/HeaderContext";
import { useRouter } from "next/router";

function Header() {
  const { categories } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchOpen, setSearchOpen] = useState(false); // To toggle search input
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Using Next.js router for navigation

  // Handle search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "#02353C",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
          width: "100vw",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: isSmallScreen ? "8px 16px" : "12px 24px", // Adjust padding
        }}
      >
        <Typography
          component="h2"
          variant={isSmallScreen ? "h6" : "h5"}
          color="#ffffff"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: isSmallScreen ? "1rem" : "1.25rem", // Reduce font size
          }}
        >
          Prop Firm News
        </Typography>

        {/* Conditionally show the search input */}
        {searchOpen ? (
          <form onSubmit={handleSearchSubmit} style={{ flexGrow: 1 }}>
            <InputBase
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search…"
              autoFocus
              sx={{
                bgcolor: "#fff",
                padding: "2px 8px",
                borderRadius: "4px",
                width: "100%",
                color: "#000",
              }}
            />
          </form>
        ) : null}

        <IconButton
          onClick={() => setSearchOpen((prev) => !prev)}
          sx={{ marginLeft: "auto" }}
        >
          <SearchIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          bgcolor: "#02353C",
          width: "100vw",
          position: "sticky",
          top: 56, // Adjust top to reduce the gap
          zIndex: 999,
          padding: "4px 16px", // Adjust padding
        }}
      >
        {categories.map((category) => (
          <Link
            key={category}
            color="#ffffff"
            noWrap
            variant="body2"
            href={`/categories/${category.toLowerCase()}`}
            sx={{
              p: isSmallScreen ? 0.5 : 1, // Adjust padding for smaller text
              fontSize: isSmallScreen ? "0.75rem" : "0.875rem", // Smaller font size
            }}
          >
            {category}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
