import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function FeaturedPost(props) {
  const { post } = props;

  if (!post) return null;

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
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 120, height: "auto" }}
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
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
