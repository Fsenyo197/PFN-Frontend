// HomePage.js
import * as React from "react";
import { useState } from "react";
import { Container, Grid, CircularProgress } from "@mui/material"; // Import CircularProgress for the spinner
import MostRecentPost from "../components/MostRecentPost";
import FeaturedPost from "../components/FeaturedPost";
import { useHomePage } from "../contexts/HomePageContext";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import Footer from "./Footer";

const HomePage = () => {
  const { mostRecentPost, featuredPosts, error, loading } = useHomePage(); // Get the loading state
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

  if (error) {
    return <p>Error loading content: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="Prop News"
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <main>
          {loading ? (
            <div style={{ textAlign: "center", marginTop: "20%" }}>
              <CircularProgress /> {/* Show spinner when loading */}
            </div>
          ) : (
            <>
              <MostRecentPost post={mostRecentPost} />
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
