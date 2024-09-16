import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useHeader } from "../contexts/HeaderContext";

function Header() {
  const { categories } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppBar
        component="nav"
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#02353C", // Set header background
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            component="h2"
            variant={isSmallScreen ? "h6" : "h5"}
            color="#ffffff"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Prop Firm News
          </Typography>
          <IconButton>
            <SearchIcon sx={{ color: "#ffffff" }} />{" "}
            {/* Set search icon color to white */}
          </IconButton>
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{
            justifyContent: "space-between",
            overflowX: "auto",
          }}
        >
          {categories.map((category) => (
            <Link
              color="#ffffff"
              noWrap
              key={category}
              variant="body2"
              href={`/categories/${category.toLowerCase()}`}
              sx={{ p: 1, flexShrink: 0 }}
            >
              {category}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
