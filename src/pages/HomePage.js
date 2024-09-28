import * as React from "react";
import { Container, Grid, CircularProgress } from "@mui/material"; // Import CircularProgress for the spinner
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
    // Show only the spinner and nothing else while loading
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="100">
        <main>
          {mostRecentPost && mostRecentPost.title ? (
            <MostRecentPost post={mostRecentPost} />
          ) : null}
          <Grid container>
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
