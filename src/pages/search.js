import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../components/FeaturedPost";
import FetchArticles from "../utils/FetchArticles";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./Footer";
import Header from "../components/Header";

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && query) {
      const fetchAndFilterArticles = async () => {
        setLoading(true);
        try {
          const articles = await FetchArticles();

          // Convert query to lowercase and check for undefined or empty values
          const searchQuery = query.toLowerCase() || "";

          // Filter articles based on the search query
          const filteredResults = articles.filter(
            (article) =>
              (article.title &&
                article.title.toLowerCase().includes(searchQuery)) ||
              (article.description &&
                article.description.toLowerCase().includes(searchQuery))
          );

          setResults(filteredResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAndFilterArticles();
    } else {
      setLoading(false);
    }
  }, [router.isReady, query]);

  return (
    <>
      <Header />
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Search Results for: &quot;{query || ""}&quot;
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : results.length > 0 ? (
          <Grid container spacing={4}>
            {results.map((post, index) => (
              <FeaturedPost key={index} post={post} />
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No results found.</Typography>
        )}
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
};

export default SearchResultsPage;
