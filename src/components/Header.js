import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useHeader } from "../contexts/HeaderContext";

function Header() {
  const { isDarkMode, toggleTheme } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const headerTextColor = isDarkMode ? "#ffffff" : "#02353C";

  // Manually defined category names
  const categories = ["News", "Prices", "Payouts", "Rules", "Trading Platform"];

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: isDarkMode ? "#000000" : "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Typography
          component="h2"
          variant={isSmallScreen ? "h6" : "h5"}
          color={headerTextColor}
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Prop News
        </Typography>
        <IconButton>
          <SearchIcon sx={{ color: headerTextColor }} />
        </IconButton>
        <Button variant="contained" onClick={toggleTheme}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </Toolbar>

      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          bgcolor: isDarkMode ? "#000000" : "#ffffff",
        }}
      >
        {categories.map((category) => (
          <Link
            color={headerTextColor}
            noWrap
            key={category}
            variant="body2"
            href={`/${category.toLowerCase().replace(/\s+/g, "-")}`}
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
