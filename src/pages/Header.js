import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Header(props) {
  const { sections, title, toggleTheme, isDarkMode } = props;
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
          {title}
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
        {sections.map((section) => (
          <Link
            color={headerTextColor}
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Header;
