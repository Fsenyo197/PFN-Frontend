import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../components/FeaturedPost";
import FetchArticles from "../utils/FetchArticles";
import CircularProgress from "@mui/material/CircularProgress";

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (query) {
      const fetchAndFilterArticles = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        try {
          const articles = await FetchArticles(); // Fetch all articles

          // Filter articles based on the search query
          const filteredResults = articles.filter(
            (article) =>
              (article.title &&
                article.title.toLowerCase().includes(query.toLowerCase())) ||
              (article.description &&
                article.description.toLowerCase().includes(query.toLowerCase()))
          );

          setResults(filteredResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };

      fetchAndFilterArticles();
    } else {
      setLoading(false); // Set loading to false if there's no query
    }
  }, [query]);

  return (
    <Container>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Search Results for: &quot;{query}&quot;
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
  );
};

export default SearchResultsPage;
