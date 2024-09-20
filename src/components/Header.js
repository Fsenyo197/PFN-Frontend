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
          bgcolor: "#02353C", // Header background
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
          position: "sticky",
          top: 0,
          zIndex: 1000,
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
          <SearchIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          bgcolor: "#02353C", // Background color for categories
          width: "100vw",
          position: "sticky",
          top: 64, // Adjust based on main header height
          zIndex: 999,
        }}
      >
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category.toLowerCase()}`}
            sx={{
              color: "#ffffff",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.05em",
              padding: "8px 16px",
              margin: "0 8px",
              borderRadius: "5px",
              textDecoration: "none",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#034f5b", // Hover background
                transform: "scale(1.05)", // Slight hover effect
              },
              "&:active": {
                backgroundColor: "#022f35", // Active state color
                transform: "scale(1.02)", // Click effect
              },
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
