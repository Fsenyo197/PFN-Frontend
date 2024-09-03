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
            bgcolor: "#02353C",
            color: "white",
            maxHeight: 200,
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              padding: "8px",
            }}
          >
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "#B0B0B0", fontSize: "0.8rem" }}
            >
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Button onClick={handleClick} sx={{ mt: 2 }}>
              Read more
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 120, height: "auto" }} // Adjust width and let height adjust automatically
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
