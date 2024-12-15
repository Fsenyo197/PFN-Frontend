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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DrawerMenu from "@/components/DrawerMenu";

const Header = () => {
  const { categories } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [compareFirmsExpanded, setCompareFirmsExpanded] = useState(false);
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

  const handleCompareFirmsToggle = () => {
    setCompareFirmsExpanded((prev) => !prev);
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
          sx={{ fontWeight: "bold" }}
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
            top: 56,
            zIndex: 999,
            padding: "4px 16px",
          }}
        >
          {categories.map((category) => {
            if (typeof category === "string") {
              const categoryPath =
                category === "Home"
                  ? "/"
                  : `/categories/${category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`;

              return (
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
                    backgroundColor: currentPath.includes(
                      category.toLowerCase()
                    )
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
            } else if (category.name === "Compare Firms") {
              return (
                <div key={category.name} style={{ position: "relative" }}>
                  <Typography
                    variant="body2"
                    onClick={handleCompareFirmsToggle}
                    sx={{
                      cursor: "pointer",
                      p: 1,
                      fontSize: "0.875rem",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        color: "#02353C",
                        backgroundColor: "#ffffff",
                      },
                    }}
                  >
                    {category.name}
                    {compareFirmsExpanded ? <ExpandLess /> : <ExpandMore />}
                  </Typography>
                  <Collapse
                    in={compareFirmsExpanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List sx={{ pl: 2 }}>
                      {category.subcategories.map((subcategory) => (
                        <ListItem
                          button
                          key={subcategory.name}
                          onClick={() => router.push(subcategory.path)}
                          sx={{ p: 0 }}
                        >
                          <ListItemText primary={subcategory.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            }
          })}
        </Toolbar>
      )}

      {isSmallScreen && (
        <DrawerMenu
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          categories={categories}
          onCategoryClick={(path) => {
            router.push(path);
            setDrawerOpen(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
