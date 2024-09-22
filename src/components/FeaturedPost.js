import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";

function FeaturedPost({ post }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: { md: "0 16px" }, // Adds horizontal padding between posts on medium and larger screens
        }}
      >
        <CardActionArea onClick={handleClick}>
          <Card
            elevation={0} // Set elevation to 0 to remove shadow
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              padding: "16px 0", // Padding for vertical spacing
              bgcolor: "white",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                paddingLeft: "16px", // Left padding for content
                paddingRight: "16px", // Right padding for content
              }}
            >
              <Typography
                component="h2"
                variant="h6" // Smaller variant for title
                sx={{ fontSize: "1rem", fontWeight: "bold" }} // Smaller title font
              >
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: "8px", color: "#000", fontSize: "0.875rem" }} // Description text with smaller font
              >
                {post.meta_description}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{
                width: 120,
                height: 80,
                borderRadius: "4px", // Rounded corners for image
                margin: "auto 16px", // Spacing for the image
              }}
              image={post.image}
            />
          </Card>
          <CardContent>
            <Typography
              variant="caption"
              sx={{ marginTop: "4px", color: "#666" }} // Reduced margin for read time
            >
              {`${post.read_time} min read`}
            </Typography>
          </CardContent>
        </CardActionArea>

        {/* Divider line for separation between posts */}
        <Divider sx={{ bgcolor: "#02353C", height: 1 }} />
      </Grid>
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    meta_description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    read_time: PropTypes.number.isRequired, // Added read_time prop
  }).isRequired,
};

export default FeaturedPost;
