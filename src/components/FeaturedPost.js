// components/FeaturedPost.js
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

const FeaturedPost = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body.slice(0, 100)}...
        </Typography>
        <Button onClick={handleClick} sx={{ mt: 2 }}>
          Read more
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeaturedPost;
