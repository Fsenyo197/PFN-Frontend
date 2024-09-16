import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";
import Button from "@mui/material/Button"; // Correct import for Button

function FeaturedPost({ post }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card
          sx={{
            display: "flex",
            bgcolor: "white", // Keep background white
            color: "#02353C", // General text color
            maxHeight: 200,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Add soft shadow for depth
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              padding: "16px", // Slightly increase padding for a more spacious look
            }}
          >
            <Typography component="h2" variant="h5" sx={{ color: "#02353C" }}>
              {post.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#6D6D6D", fontSize: "0.85rem" }} // Set date to gray for less emphasis
            >
              {post.date}
            </Typography>
            <Typography
              variant="subtitle1"
              paragraph
              sx={{ color: "#045D66" }} // Description color slightly lighter than the title
            >
              {post.description}
            </Typography>
            <Button
              onClick={handleClick}
              sx={{
                mt: 2,
                bgcolor: "#02353C", // Button background color
                color: "white", // White text for contrast
                "&:hover": {
                  bgcolor: "#01404A", // Slightly darker on hover
                },
              }}
            >
              Read more
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: 120,
              height: "auto",
              borderRadius: "0 4px 4px 0", // Subtle rounding for smooth corners
            }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired, // Make sure slug is required for navigation
  }).isRequired,
};

export default FeaturedPost;
