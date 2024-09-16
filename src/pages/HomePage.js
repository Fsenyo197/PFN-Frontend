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

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="64">
        <main>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "20%" }}>
              <CircularProgress /> {/* Show spinner when loading */}
            </div>
          ) : (
            <>
              {mostRecentPost && mostRecentPost.title ? (
                <MostRecentPost post={mostRecentPost} />
              ) : null}
              <Grid container spacing={4}>
                {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
                ))}
              </Grid>
            </>
          )}
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
