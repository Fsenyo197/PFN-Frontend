"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import MostRecentPost from "./MostRecentPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import post1 from "./Post1";
import post2 from "./Post2";
import post3 from "./Post3";
import { useState } from "react";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Travel", url: "#" },
];

const mostRecentPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://picsum.photos/1100/350",
  imageText: "main image description",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://picsum.photos/200/300",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://picsum.photos/200/300",
    imageLabel: "Image Text",
  },
];

const posts = [post1, post2, post3];

export default function Blog() {
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
          sections={sections}
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
}
