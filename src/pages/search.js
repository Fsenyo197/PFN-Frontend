import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FeaturedPost from "../components/FeaturedPost";
import FetchArticles from "../utils/FetchArticles";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query || {};
  const [searchQuery, setSearchQuery] = useState(
    query ? query.toLowerCase() : ""
  );
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

          setResults(
            filteredResults.length > 0 ? filteredResults : articles.slice(0, 10)
          ); // Show top 10 articles if no exact matches
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAndFilterArticles();
    }
  }, [router.isReady, query, searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    router.push("/search"); // Navigate to a default state (or you can navigate to the homepage or another route)
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
          Search Results
        </Typography>

        <TextField
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search articles..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery && (
                  <IconButton onClick={handleClear} aria-label="clear">
                    <ClearIcon />
                  </IconButton>
                )}
                <IconButton onClick={handleSearch} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: "30px" }}
        />

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
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
};

export default SearchResultsPage;
