import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function MostRecentPost({
  post = {
    description: "",
    image: "",
    imageText: "",
    linkText: "",
    link: "",
    title: "",
  },
}) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: post.image ? `url(${post.image})` : "none",
      }}
    >
      {post.image && (
        <img
          style={{ display: "none" }}
          src={post.image}
          alt={post.imageText || "Most recent post image"}
        />
      )}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title || "Loading..."}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description || "Description will be available soon."}
            </Typography>
            {post.linkText && (
              <Link variant="subtitle1" href={post.link || "#"}>
                {post.linkText}
              </Link>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MostRecentPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    imageText: PropTypes.string,
    linkText: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default MostRecentPost;
