// pages/index.js or pages/HomePage.js
import React from "react";
import { Container, Grid } from "@mui/material";
import MostRecentPost from "../components/MostRecentPost";
import FeaturedPost from "../components/FeaturedPost";
import { useHomePage } from "../contexts/HomePageContext";

const HomePage = () => {
  const { mostRecentPost, featuredPosts, error } = useHomePage();

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  return (
    <Container maxWidth="lg">
      <MostRecentPost post={mostRecentPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.id} post={post} />
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
