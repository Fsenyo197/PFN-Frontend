import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import {
  format,
  differenceInHours,
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
  isValid,
} from "date-fns"; // Import additional functions

function FeaturedPost({ post }) {
  const router = useRouter();

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
    <>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: { md: "0 16px" },
        }}
      >
        <CardActionArea onClick={handleClick}>
          <Card
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: "16px 0",
              bgcolor: "white",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: "8px", color: "#000", fontSize: "0.875rem" }}
              >
                {post.meta_description}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{
                width: 160,
                height: 100,
                borderRadius: "4px",
                margin: "auto 16px",
              }}
              image={post.image}
            />
          </Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#666",
                fontSize: "0.875rem",
              }}
            >
              <Typography variant="caption">{formattedDate}</Typography>
              <Typography variant="caption">{`${post.read_time} min read`}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>

        <Divider sx={{ bgcolor: "#02353C" }} />
      </Grid>
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date_published: PropTypes.string.isRequired,
    meta_description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    read_time: PropTypes.number.isRequired,
  }).isRequired,
};

export default FeaturedPost;
