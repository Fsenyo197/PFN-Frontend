import React from "react";
import { Container, Grid, CircularProgress } from "@mui/material";
import MostRecentPost from "../components/MostRecentPost";
import FeaturedPost from "../components/FeaturedPost";
import { useHomePage } from "../contexts/HomePageContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "./Footer";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: '"Georgia", "Roboto", sans-serif',
  },
});

const HomePage = () => {
  const { mostRecentPost, featuredPosts, error, loading } = useHomePage();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  console.log("HomePage mostRecentPost:", mostRecentPost); // Debugging line

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="64">
        {" "}
        {/* Changed from "64" to "lg" for valid MUI breakpoint */}
        <main>
          {mostRecentPost && mostRecentPost.title ? (
            <MostRecentPost post={mostRecentPost} />
          ) : null}
          <Grid container>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.slug} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;
