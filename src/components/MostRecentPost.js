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
        cursor: "pointer",
        height: imageSize?.height || { xs: 300, md: 450 }, // Adjusted height for better emphasis
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", // Shadow effect
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
          backgroundColor: "rgba(0,0,0,.5)", // Darkened overlay to improve text readability
        }}
      />
      <Grid container>
        <Grid item md={8}>
          {" "}
          {/* Widened the text area */}
          <Box
            sx={{
              position: "relative",
              p: { xs: 2, md: 4 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h1"
              variant="h4" // Slightly smaller heading size for mobile
              color="inherit"
              gutterBottom
              sx={{
                fontWeight: 700, // Bold title
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)", // Add text shadow to make title pop
              }}
            >
              {post.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="inherit"
              sx={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)", // Subtle text shadow for subtitle
              }}
            >
              {post.meta_description || "Subtitle or additional info here"}{" "}
              {/* Added subtitle or description */}
            </Typography>
            <Typography variant="caption" color="inherit">
              {post.readTime ? `${post.readTime} min read` : "3 hrs ago"}{" "}
              {/* Placeholder for read time */}
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
    slug: PropTypes.string.isRequired,
    meta_description: PropTypes.string, // Added description
    readTime: PropTypes.string, // Added read time
  }).isRequired,
};

export default MostRecentPost;
