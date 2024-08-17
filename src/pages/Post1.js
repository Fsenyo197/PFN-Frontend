import React from "react";
import { Typography, Box, List, ListItem, Divider } from "@mui/material";

const Post1 = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="subtitle2" color="textSecondary" paragraph>
        _April 1, 2020 by <a href="/">Olivier</a>_
      </Typography>
      <Typography paragraph>
        This blog post shows a few different types of content that are supported
        and styled with Material styles. Basic typography, images, and code are
        all supported. You can extend these by modifying{" "}
        <code>Markdown.js</code>.
      </Typography>
      <Typography paragraph>
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
        venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras
        mattis consectetur purus sit amet fermentum.
      </Typography>
      <Typography paragraph>
        Curabitur blandit tempus porttitor.{" "}
        <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo.
        Nullam id dolor id nibh ultricies vehicula ut id elit.
      </Typography>
      <Typography paragraph>
        Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur
        purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
      </Typography>
      <Typography variant="h6">Heading</Typography>
      <Typography paragraph>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros.
      </Typography>
      <Typography variant="h6">Sub-heading 1</Typography>
      <Typography paragraph>
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus.
      </Typography>
      <Typography variant="h6">Sub-heading 2</Typography>
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
        Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit
        libero, a pharetra augue.
      </Typography>
      <List>
        <ListItem>
          <Typography>
            1. Vestibulum id ligula porta felis euismod semper.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            1. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            1. Maecenas sed diam eget risus varius blandit sit amet non magna.
          </Typography>
        </ListItem>
      </List>
      <Typography paragraph>
        Cras mattis consectetur purus sit amet fermentum. Sed posuere
        consectetur est at lobortis.
      </Typography>
    </Box>
  );
};

export default Post1;
