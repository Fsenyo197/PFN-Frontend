// components/MostRecentPost.js
import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/router";

const MostRecentPost = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(post.link);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textAlign: "center",
        p: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {post.description.slice(0, 150)}...
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{ mt: 2 }}
      >
        {post.linkText}
      </Button>
    </Box>
  );
};

export default MostRecentPost;
