import * as React from "react";
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
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "#02353C", // Set the header background to the same teal color
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
          width: "100vw", // Full width
          position: "sticky", // Make it sticky
          top: 0, // Stick to the top
          zIndex: 1000, // Stay on top of other elements
        }}
      >
        <Typography
          component="h2"
          variant={isSmallScreen ? "h6" : "h5"}
          color="#ffffff" // Set text color to white
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
          bgcolor: "#02353C", // Keep the background consistent
          width: "100vw", // Full width for the navigation bar
          position: "sticky", // Make it sticky
          top: 0, // Stick to the top just below the main header
          zIndex: 999, // Slightly lower z-index to stay beneath the main toolbar
        }}
      >
        {categories.map((category) => (
          <Link
            color="#ffffff" // Set link color to white
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
    </React.Fragment>
  );
}

export default Header;
