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
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  // Initialize searchInput with query from URL
  useEffect(() => {
    if (query) {
      setSearchInput(query);
    }
  }, [query]);

  useEffect(() => {
    if (router.isReady && query) {
      const fetchAndFilterArticles = async () => {
        setLoading(true);
        try {
          const articles = await FetchArticles();

          // Convert query to lowercase for case-insensitive search
          const searchQuery = query.toLowerCase();

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
  }, [router.isReady, query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchInput("");
    router.push("/"); // Redirect to home or any desired page after clearing
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
        <form onSubmit={handleSearchSubmit}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#02353C" }} />
                </InputAdornment>
              ),
              endAdornment: searchInput && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} aria-label="clear">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              maxWidth: "500px",
            }}
          />
        </form>
      </Typography>

      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : results.length > 0 ? (
        <Grid container spacing={4}>
          {results.map((post, index) => (
            <FeaturedPost key={index} post={post} />
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center">
          No exact results found. Here are some related articles:
        </Typography>
      )}
    </Container>
  );
};

export default SearchResultsPage;
