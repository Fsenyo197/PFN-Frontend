import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
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
          <Typography variant="body1" component="p">
            Welcome to the user guide. Here you will find all the information
            you need to get started and make the most out of our platform.
          </Typography>
          <Typography>
            Select your preffered options and click the "Search for Firm"
            buttons
          </Typography>
          <Typography>
            Filter your preffered firm by name using the Search bar (if
            necessary)
          </Typography>
          <Typography>
            Click on the table cells or rows to see more details about the firms
          </Typography>
          <Typography>
            Click the cell or row to open, click it to close it back when
            necessary
          </Typography>
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
