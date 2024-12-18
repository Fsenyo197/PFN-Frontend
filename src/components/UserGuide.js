import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const UserGuide = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} color="primary">
        <MenuBookIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <MenuBookIcon sx={{ marginRight: "0.5rem" }} />
          User Guide
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" component="p" gutterBottom>
            Welcome to the User Guide! Here you'll find everything you need to
            get started and make the most of our platform.
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 2 }}>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              <ListItemText primary="Choose your preferred options and click the 'Search for Firm' button to begin." />
            </ListItem>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              <ListItemText primary="You can filter firms by name using the search bar if needed." />
            </ListItem>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              <ListItemText primary="Click on any row or cell in the table to view more details about a firm." />
            </ListItem>
            <ListItem sx={{ display: "list-item", pl: 0 }}>
              <ListItemText primary="To open or close the details, simply click the row or cell again." />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserGuide;
