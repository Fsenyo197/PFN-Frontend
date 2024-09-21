import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../components/FeaturedPost";
import FetchArticles from "../utils/FetchArticles";

const SearchResultsPage = () => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchAndFilterArticles = async () => {
        try {
          const articles = await FetchArticles(); // Fetch all articles

          // Filter articles based on the search query
          const filteredResults = articles.filter(
            (article) =>
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.description.toLowerCase().includes(query.toLowerCase())
          );

          setResults(filteredResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchAndFilterArticles();
    }
  }, [query]);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for: "{query}"
      </Typography>

      {results.length > 0 ? (
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
