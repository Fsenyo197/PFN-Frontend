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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Handle search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle search icon click
  const handleSearchIconClick = () => {
    if (searchOpen && searchQuery.trim()) {
      // If search is open and query is not empty, submit the search
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      // Otherwise, just toggle the search input visibility
      setSearchOpen((prev) => !prev);
    }
  };

  // Extract current category from the URL
  const currentPath = router.asPath.toLowerCase();

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
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: isSmallScreen ? "8px 16px" : "12px 24px",
        }}
      >
        <Typography
          component="h2"
          variant={isSmallScreen ? "h6" : "h5"}
          color="#ffffff"
          noWrap
          sx={{
            flexGrow: 1,
            fontSize: isSmallScreen ? "1rem" : "1.25rem",
          }}
        >
          Prop Firm News
        </Typography>

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

        <IconButton onClick={handleSearchIconClick} sx={{ marginLeft: "auto" }}>
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
          width: "100%",
          position: "sticky",
          top: isSmallScreen ? 48 : 56, // Adjust for different screen sizes
          zIndex: 999,
          padding: "4px 16px",
        }}
      >
        {categories.map((category) => {
          // Normalize category path by replacing spaces with hyphens and making it lowercase
          const categoryPath =
            category === "Home"
              ? "/"
              : `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`;

          const isActive = currentPath === categoryPath;

          return (
            <Link
              key={category}
              href={categoryPath}
              noWrap
              variant="body2"
              sx={{
                p: isSmallScreen ? 0.5 : 1,
                fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                transition: "background-color 0.3s, color 0.3s",
                color: isActive ? "#02353C" : "#ffffff",
                backgroundColor: isActive ? "#ffffff" : "transparent",
                borderRadius: "4px",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#02353C",
                  borderRadius: "4px",
                  textDecoration: "none",
                },
              }}
            >
              {category}
            </Link>
          );
        })}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
