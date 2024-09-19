import React from "react";
import {
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article"; // Icon for "News"
import PriceCheckIcon from "@mui/icons-material/PriceCheck"; // Icon for "Prices"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Icon for "Payouts"
import GavelIcon from "@mui/icons-material/Gavel"; // Icon for "Rules"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Icon for "Trading Platform";

const DrawerComponent = ({
  drawerOpen,
  toggleDrawer,
  categories,
  handleNavigation,
}) => {
  // Icon mapping for each category
  const categoryIcons = {
    News: <ArticleIcon />,
    Prices: <PriceCheckIcon />,
    Payouts: <MonetizationOnIcon />,
    Rules: <GavelIcon />,
    "Trading Platform": <AccountBalanceIcon />,
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{ mr: 2 }}
      >
        <MenuIcon sx={{ color: "#02353C" }} />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItemButton onClick={() => handleNavigation("/")}>
            <ListItemText primary="Home" />
          </ListItemButton>
          {categories.map((category) => (
            <ListItemButton
              key={category}
              onClick={() =>
                handleNavigation(`/categories/${category.toLowerCase()}`)
              }
            >
              <ListItemIcon>{categoryIcons[category]}</ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
