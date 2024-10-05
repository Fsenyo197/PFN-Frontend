import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import {
  format,
  isValid,
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

function MostRecentPost({ post, imageSize }) {
  const router = useRouter();

  if (!post || !post.image || !post.title || !post.slug) {
    return null;
  }

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  // Determine time difference in hours, minutes, seconds, and days
  let formattedDate = "Invalid date";
  const postDate = new Date(post.date_published);
  if (isValid(postDate)) {
    const now = new Date();
    const hoursDifference = differenceInHours(now, postDate);
    const daysDifference = differenceInDays(now, postDate);
    const minutesDifference = differenceInMinutes(now, postDate); // Calculate minutes difference
    const secondsDifference = differenceInSeconds(now, postDate); // Calculate seconds difference

    if (secondsDifference < 60) {
      formattedDate = `${secondsDifference} seconds ago`; // Less than 1 minute
    } else if (minutesDifference < 60) {
      formattedDate = `${minutesDifference} minutes ago`; // Less than 1 hour
    } else if (hoursDifference < 24) {
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
        cursor: "pointer",
        height: imageSize?.height || { xs: 200, md: 400 },
      }}
      onClick={handleClick}
    >
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
      <Grid container direction={{ xs: "column", md: "row" }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 2, md: 4 },
              pr: { md: 0 },
            }}
          >
            <Box sx={{ mt: { xs: 4, md: 18 } }}>
              <Typography variant="h5" color="inherit" gutterBottom>
                {post.title}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#ddd",
                fontSize: "0.875rem",
                mt: { xs: 8, md: 20 },
                pr: { xs: 2 },
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
    slug: PropTypes.string.isRequired,
    date_published: PropTypes.string.isRequired,
  }).isRequired,
  imageSize: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  }),
};

export default MostRecentPost;
