import React, { useState } from "react";
import { useRouter } from "next/router";
import { useHeader } from "../contexts/HeaderContext";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Header = () => {
  const { categories } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleCategoryClick = (path) => {
    router.push(path);
    setDrawerOpen(false);
  };

  const currentPath = router.asPath.toLowerCase();

  return (
    <React.Fragment>
      {/* Top Toolbar */}
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
            fontSize: isSmallScreen ? "1rem" : "1.25rem",
            fontWeight: "bold",
          }}
        >
          Prop Firm News
        </Typography>

        {searchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            style={{ flexGrow: 1, marginLeft: "16px" }}
          >
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

        <IconButton
          onClick={handleSearchIconClick}
          sx={{ marginLeft: searchOpen ? "8px" : "auto" }}
        >
          <SearchIcon sx={{ color: "#ffffff" }} />
        </IconButton>

        {isSmallScreen && (
          <IconButton onClick={() => toggleDrawer(true)}>
            <MenuIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        )}
      </Toolbar>

      {/* Bottom Toolbar for larger screens */}
      {!isSmallScreen && (
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
            const categoryPath =
              typeof category === "string"
                ? category === "Home"
                  ? "/"
                  : `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`
                : null;

            return typeof category === "string" ? (
              <Link
                key={category}
                href={categoryPath}
                noWrap
                variant="body2"
                sx={{
                  p: 1,
                  fontSize: "0.875rem",
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
            ) : null;
          })}
        </Toolbar>
      )}

      {/* Drawer for smaller screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{ marginTop: 24 }}
      >
        <List sx={{ width: 250 }}>
          {categories.map((category) => {
            const categoryPath =
              typeof category === "string"
                ? category === "Home"
                  ? "/"
                  : `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`
                : null;

            return typeof category === "string" ? (
              <ListItem
                button
                key={category}
                onClick={() => handleCategoryClick(categoryPath)}
              >
                <ListItemText primary={category} />
              </ListItem>
            ) : (
              <ListItem
                button
                key={category.name}
                onClick={() => toggleDrawer(false)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
