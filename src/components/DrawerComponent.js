import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import NewsIcon from "@mui/icons-material/Article";
import PricesIcon from "@mui/icons-material/AttachMoney";
import PayoutsIcon from "@mui/icons-material/Payment";
import RulesIcon from "@mui/icons-material/Gavel";
import TradingPlatformIcon from "@mui/icons-material/Computer";

const categoryIcons = {
  News: <NewsIcon />,
  Prices: <PricesIcon />,
  Payouts: <PayoutsIcon />,
  Rules: <RulesIcon />,
  "Trading Platform": <TradingPlatformIcon />,
};

const DrawerComponent = ({ drawerOpen, toggleDrawer, categories }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    toggleDrawer(); // Close drawer after navigation
    router.push(path);
  };

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <List>
        {/* Home at the top */}
        <ListItemButton onClick={() => handleNavigation("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
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
            <ListItemText primary={category} />
          </ListItemButton>
        ))}

        {/* Divider and space after Categories */}
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
