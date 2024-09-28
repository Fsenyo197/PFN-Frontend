import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { format } from "date-fns"; // Import date-fns for date formatting

function MostRecentPost({ post, imageSize }) {
  const router = useRouter();

  // Ensure that `post` and its properties are defined before attempting to use them
  if (!post || !post.image || !post.title || !post.slug) {
    return null; // Render nothing if the post data is incomplete
  }

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  // Convert date_published to a more readable format
  const formattedDate = format(new Date(post.date_published), "MMMM d, yyyy");

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
      <image style={{ display: "none" }} src={post.image} />
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
              variant="h1"
              color="inherit"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // Space between date and read time
                alignItems: "center", // Center align items vertically
                color: "#ddd", // Light grey text color for contrast
                fontSize: "0.875rem", // Font size for smaller text
                mt: 2, // Add margin-top for spacing
              }}
            >
              <Typography variant="caption">{formattedDate}</Typography>
              <Typography variant="caption">{`${post.read_time} min read`}</Typography>
            </Box>
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
    date_published: PropTypes.string.isRequired, // Ensure date_published is included
    read_time: PropTypes.number.isRequired, // Ensure read_time is included
  }).isRequired,
  imageSize: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.object]), // Optional height for image
  }),
};

export default MostRecentPost;
