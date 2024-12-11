import React, { useState } from "react";
import { useRouter } from "next/router";
import { useHeader } from "../contexts/HeaderContext";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const { categories } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEls, setAnchorEls] = useState({});
  const router = useRouter();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchIconClick = () => {
    if (searchOpen && searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      setSearchOpen((prev) => !prev);
    }
  };

  const handleMenuOpen = (event, categoryName) => {
    setAnchorEls((prev) => ({ ...prev, [categoryName]: event.currentTarget }));
  };

  const handleMenuClose = (categoryName) => {
    setAnchorEls((prev) => ({ ...prev, [categoryName]: null }));
  };

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

        {searchOpen && (
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
        )}

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
          top: isSmallScreen ? 48 : 56,
          zIndex: 999,
          padding: "4px 16px",
        }}
      >
        {categories.map((category) => {
          if (typeof category === "string") {
            const categoryPath =
              category === "Home"
                ? "/"
                : `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <Link
                key={category}
                href={categoryPath}
                noWrap
                variant="body2"
                sx={{
                  p: isSmallScreen ? 0.5 : 1,
                  fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                  color: currentPath.includes(category.toLowerCase())
                    ? "#02353C"
                    : "#ffffff",
                  backgroundColor: currentPath.includes(category.toLowerCase())
                    ? "#ffffff"
                    : "transparent",
                  borderRadius: "4px",
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#02353C",
                  },
                }}
              >
                {category}
              </Link>
            );
          } else {
            const anchorEl = anchorEls[category.name] || null;

            return (
              <div key={category.name}>
                <Typography
                  onClick={(event) => handleMenuOpen(event, category.name)}
                  noWrap
                  variant="body2"
                  sx={{
                    p: isSmallScreen ? 0.5 : 1,
                    fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  {category.name}
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleMenuClose(category.name)}
                >
                  {category.subcategories.map((sub) => (
                    <MenuItem
                      key={sub.name}
                      onClick={() => {
                        router.push(sub.path);
                        handleMenuClose(category.name);
                      }}
                    >
                      {sub.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            );
          }
        })}
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
