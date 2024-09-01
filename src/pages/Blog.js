"use client";

import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from "../components/Header";
import MostRecentPost from "./MostRecentPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import { useBlog } from "../contexts/BlogContext";

export default function Blog() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const { mostRecentPost, featuredPosts, loading, error } = useBlog();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: '"Georgia", "Roboto", sans-serif',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MostRecentPost post={mostRecentPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </Grid>
        </main>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </Container>
    </ThemeProvider>
  );
}
