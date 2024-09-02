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
  const { categories, isDarkMode, toggleTheme } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const headerTextColor = isDarkMode ? "#ffffff" : "#02353C";

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: isDarkMode ? "#000000" : "#ffffff",
        }}
      >
        <Typography
          component="h2"
          variant={isSmallScreen ? "h6" : "h5"}
          color={headerTextColor}
          align="center"
          noWrap
          sx={{ flex: 1 }}
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
        {/* Check if categories has data before mapping */}
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <Link
              color={headerTextColor}
              noWrap
              key={category.name} // Use 'name' instead of 'title'
              variant="body2"
              href={`/categories/${category.name.toLowerCase()}`} // Example dynamic URL
              sx={{ p: 1, flexShrink: 0 }}
            >
              {category.name} // Use 'name' instead of 'title'
            </Link>
          ))
        ) : (
          <Typography color={headerTextColor} variant="body2" sx={{ p: 1 }}>
            No categories available
          </Typography>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
