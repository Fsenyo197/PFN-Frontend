import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { format, isValid, differenceInHours, differenceInDays } from "date-fns";

function MostRecentPost({ post, imageSize }) {
  const router = useRouter();

  // Ensure that `post` and its properties are defined before attempting to use them
  if (!post || !post.image || !post.title || !post.slug) {
    return null; // Render nothing if the post data is incomplete
  }

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  // Determine time difference in hours and days
  let formattedDate = "Invalid date";
  const postDate = new Date(post.date_published);
  if (isValid(postDate)) {
    const now = new Date();
    const hoursDifference = differenceInHours(now, postDate);
    const daysDifference = differenceInDays(now, postDate);

    if (hoursDifference < 24) {
      formattedDate = `${hoursDifference} hours ago`;
    } else if (daysDifference < 30) {
      formattedDate = `${daysDifference} days ago`;
    } else {
      formattedDate = format(postDate, "MMMM d, yyyy");
    }
  }

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
      <image style={{ display: "none" }} src={post.image} alt={post.title} />
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
            {/* Title positioned in the bottom left corner */}
            <Box sx={{ mt: { xs: 4, md: 18 } }}>
              <Typography variant="h5" color="inherit" gutterBottom>
                {post.title}
              </Typography>
            </Box>

            {/* Flex container for date and read time */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between", // Space between date and read time
                alignItems: "center", // Center align items vertically
                color: "#ddd", // Light grey text color for contrast
                fontSize: "0.875rem", // Font size for smaller text
                mt: { xs: 8, md: 20 }, // Add margin-top for spacing
                pr: { xs: 2 }, // Adjust padding to control horizontal spacing
              }}
            >
              <Typography variant="caption">{formattedDate}</Typography>
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
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired, // Added slug for routing
    date_published: PropTypes.string.isRequired,
  }).isRequired,
  imageSize: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.object]), // Optional height for image
  }),
};

export default MostRecentPost;
