"use client";

import * as React from "react";
import { useState } from "react";
import { Container, Grid } from "@mui/material";
import MostRecentPost from "../components/MostRecentPost";
import FeaturedPost from "../components/FeaturedPost";
import { useHomePage } from "../contexts/HomePageContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import Footer from "./Footer";

const HomePage = () => {
  const { mostRecentPost, featuredPosts, error } = useHomePage();

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: '"Georgia", "Roboto", sans-serif',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="64">
        <Header
          title="Prop News"
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <main>
          <MostRecentPost post={mostRecentPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
};

export default HomePage;
