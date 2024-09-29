import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../components/FeaturedPost";
import FetchArticles from "../utils/FetchArticles";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton"; // Imported IconButton

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define searchQuery in the component scope
  const searchQuery = query ? query.toLowerCase() : "";

  useEffect(() => {
    if (router.isReady && query) {
      const fetchAndFilterArticles = async () => {
        setLoading(true);
        try {
          const articles = await FetchArticles();

          // Filter articles based on the search query
          const filteredResults = articles.filter(
            (article) =>
              (article.title &&
                article.title.toLowerCase().includes(searchQuery)) ||
              (article.description &&
                article.description.toLowerCase().includes(searchQuery))
          );

          // If no exact matches are found, select up to 10 related articles
          if (filteredResults.length === 0) {
            const relatedResults = articles
              .filter(
                (article) =>
                  (article.title &&
                    article.title.toLowerCase().includes(searchQuery)) ||
                  (article.description &&
                    article.description.toLowerCase().includes(searchQuery))
              )
              .slice(0, 10); // Get up to 10 related articles

            setResults(relatedResults);
          } else {
            setResults(filteredResults);
          }
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
  }, [router.isReady, query, searchQuery]);

  const handleClear = () => {
    // Navigate back to the home page or any other desired route
    router.push("/");
  };

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
        {searchQuery && (
          <IconButton
            onClick={handleClear}
            aria-label="clear"
            sx={{ p: "10px", color: "#02353C" }}
          >
            <ClearIcon />
            <SearchIcon />
          </IconButton>
        )}
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
        <Typography variant="body1">
          No exact results found. Here are some related articles:
        </Typography>
      )}
    </Container>
  );
};

export default SearchResultsPage;
