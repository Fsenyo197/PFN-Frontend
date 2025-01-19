import React, { useState } from 'react';
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
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
          <MenuBookIcon sx={{ marginRight: '0.5rem' }} />
          User Guide
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" component="p" gutterBottom>
            Welcome to the User Guide!
          </Typography>

          <List sx={{ listStyleType: 'disc', pl: 2 }}>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="Select your preferred options and click the 'Search for Firm' button to get started." />
            </ListItem>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="On the 'Make Best Choices' platform, select your preferred options and the associated firms will display below. Click the 'Reset Filters' button to reset the selected options." />
            </ListItem>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="Use the search bar to filter firms by name if needed." />
            </ListItem>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="Click on any row or cell in the table to view more details about a firm." />
            </ListItem>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="To collapse the details, click the row or cell again." />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Notable Uncovered Trading Rules
          </Typography>

          <List sx={{ listStyleType: 'disc', pl: 2 }}>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="News Trading: Most firms have similar policies on news trading. They generally prohibit opening or closing positions within a specified time window before and after scheduled news releases." />
            </ListItem>
            <ListItem sx={{ display: 'list-item', pl: 0 }}>
              <ListItemText primary="Expert Advisors (EAs): All listed firms allow the use of personal Expert Advisors (EAs) for automated trading. However, some firms may have restrictions or require prior approval for certain strategies." />
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
