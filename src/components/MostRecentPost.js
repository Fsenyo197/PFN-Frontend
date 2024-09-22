import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

function MostRecentPost({ post, imageSize }) {
  const router = useRouter();

  // Ensure that `post` and its properties are defined before attempting to use them
  if (!post || !post.image || !post.title || !post.slug) {
    return null; // Render nothing if the post data is incomplete
  }

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

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
        backgroundImage: `url(${post.image})`,
        cursor: "pointer", // Change cursor to pointer to indicate it's clickable
        height: imageSize?.height || { xs: 200, md: 400 }, // Use the height from the imageSize prop
      }}
      onClick={handleClick}
    >
      {/* Hidden image for SEO */}
      <image
        style={{ display: "none" }}
        src={post.image}
        alt={post.imageText}
      />
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
      <Grid
        container
        direction={{ xs: "column", md: "row" }} // Stacks content vertically on small screens, horizontally on larger screens
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 2, md: 4 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography
              variant="body1"
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }} // Show on small screens
            >
              {post.meta_description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MostRecentPost.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired, // Added slug for routing
    meta_description: PropTypes.string, // Added meta_description
  }).isRequired,
};

export default MostRecentPost;
