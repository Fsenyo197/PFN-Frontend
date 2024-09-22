import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";

function FeaturedPost({ post }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <CardActionArea onClick={handleClick}>
      <Card
        sx={{
          display: "flex",
          bgcolor: "white",
          marginBottom: 2, // Space between cards
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            padding: "16px",
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{ fontSize: "1rem" }} // Smaller title font
          >
            {post.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#6D6D6D", fontSize: "0.75rem", marginTop: 1 }} // Smaller date font
          >
            {post.date}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            width: 160,
            height: "auto",
            borderRadius: "0 4px 4px 0",
          }}
          image={post.image}
          alt={post.imageLabel}
        />
      </Card>
    </CardActionArea>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
