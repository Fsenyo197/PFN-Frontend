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
  const { categories } = useHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Typography
          component="h2"
          variant={isSmallScreen ? "h6" : "h5"}
          color="#02353C"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Prop Firm News
        </Typography>
        <IconButton>
          <SearchIcon sx={{ color: "#02353C" }} />
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          bgcolor: "#ffffff",
        }}
      >
        {categories.map((category) => (
          <Link
            color="#02353C"
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
