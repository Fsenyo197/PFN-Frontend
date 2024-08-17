import React from "react";
import { Typography, Box, List, ListItem } from "@mui/material";

const Post3 = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="subtitle2" color="textSecondary" paragraph>
        _March 14, 2020 by <a href="/">Tom</a>_
      </Typography>
      <Typography paragraph>
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam
        porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac
        cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
        sit amet risus.
      </Typography>
      <List>
        <ListItem>
          <Typography>
            - Praesent commodo cursus magna, vel scelerisque nisl consectetur
            et.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            - Donec id elit non mi porta gravida at eget metus.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>- Nulla vitae elit libero, a pharetra augue.</Typography>
        </ListItem>
      </List>
      <Typography paragraph>
        Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur
        purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
      </Typography>
      <Typography paragraph>
        Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit
        libero, a pharetra augue.
      </Typography>
    </Box>
  );
};

export default Post3;
