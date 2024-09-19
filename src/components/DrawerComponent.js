import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
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
    News: <ArticleIcon sx={{ color: "#02353C" }} />,
    Prices: <PriceCheckIcon sx={{ color: "#02353C" }} />,
    Payouts: <MonetizationOnIcon sx={{ color: "#02353C" }} />,
    Rules: <GavelIcon sx={{ color: "#02353C" }} />,
    "Trading Platform": <AccountBalanceIcon sx={{ color: "#02353C" }} />,
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{ color: "#02353C" }} // Set the color here
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {/* Home at the top */}
          <ListItemButton onClick={() => handleNavigation("/")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "#02353C" }} /> {/* Color for HomeIcon */}
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ sx: { color: "#02353C" } }} // Color for text
            />
          </ListItemButton>

          {/* Divider and Space before Categories */}
          <Divider />
          <Box sx={{ flexGrow: 1 }} />

          {/* Categories in the middle */}
          {categories?.map((category) => (
            <ListItemButton
              key={category}
              onClick={() =>
                handleNavigation(`/categories/${category.toLowerCase()}`)
              }
            >
              <ListItemIcon>{categoryIcons[category]}</ListItemIcon>
              <ListItemText
                primary={category}
                primaryTypographyProps={{ sx: { color: "#02353C" } }} // Color for text
              />
            </ListItemButton>
          ))}

          {/* Divider and space after Categories */}
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
        </List>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
