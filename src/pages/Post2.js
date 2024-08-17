import React from "react";
import { Typography, Box } from "@mui/material";

const Post2 = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="subtitle2" color="textSecondary" paragraph>
        _March 23, 2020 by <a href="/">Matt</a>_
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
      <Typography paragraph>
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros.
      </Typography>
    </Box>
  );
};

export default Post2;
