import React from "react";
import { Container, Grid } from "@mui/material";
import MostRecentPost from "../components/MostRecentPost";
import FeaturedPost from "../components/FeaturedPost";
import { useHomePage } from "../contexts/HomePageContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "./Footer";
import Loader from "../components/Spinner";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: '"Georgia", "Roboto", sans-serif',
  },
});

const HomePage = () => {
  const { mostRecentPost, featuredPosts, loading } = useHomePage();

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="64">
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
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;
