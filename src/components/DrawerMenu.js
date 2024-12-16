import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import PaidIcon from "@mui/icons-material/Paid";
import RuleIcon from "@mui/icons-material/Rule";
import BusinessIcon from "@mui/icons-material/Business";
import DiscountIcon from "@mui/icons-material/Discount";
import CompareIcon from "@mui/icons-material/Compare";

const DrawerMenu = ({ open, onClose, categories, onCategoryClick }) => {
  const [drawerSubmenuOpen, setDrawerSubmenuOpen] = useState(false);

  const drawerIcons = {
    Home: <HomeIcon />,
    "Prop News": <ArticleIcon />,
    Payouts: <PaidIcon />,
    "Trading Rules": <RuleIcon />,
    "Prop Firms": <BusinessIcon />,
    "Discount Codes": <DiscountIcon />,
    "Compare Firms": <CompareIcon />,
  };

  const handleDrawerSubmenuToggle = () => {
    setDrawerSubmenuOpen((prev) => !prev);
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250, marginTop: 8 }}>
        {categories.map((category) => {
          if (typeof category === "string") {
            const categoryPath =
              category === "Home"
                ? "/"
                : `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <ListItem
                button
                key={category}
                onClick={() => onCategoryClick(categoryPath)}
              >
                {drawerIcons[category]}{" "}
                <ListItemText primary={category} sx={{ pl: 2 }} />
              </ListItem>
            );
          } else if (category.name === "Compare Firms") {
            return (
              <React.Fragment key={category.name}>
                <ListItem button onClick={handleDrawerSubmenuToggle}>
                  {drawerIcons[category.name]}
                  <ListItemText primary={category.name} sx={{ pl: 2 }} />
                  {drawerSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={drawerSubmenuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.subcategories.map((subcategory) => (
                      <ListItem
                        button
                        key={subcategory.name}
                        onClick={() => onCategoryClick(subcategory.path)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={subcategory.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }
        })}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
