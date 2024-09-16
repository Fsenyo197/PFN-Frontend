import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FetchArticles from "../../utils/FetchArticles";
import Footer from "../Footer";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useHeader } from "../../contexts/HeaderContext";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const { categories } = useHeader(); // Use categories from context

  useEffect(() => {
    if (slug) {
      const loadArticle = async () => {
        setLoading(true);
        try {
          const articles = await FetchArticles();
          const selectedArticle = articles.find(
            (article) => article.slug === slug
          );

          if (selectedArticle) {
            setArticle(selectedArticle);
          } else {
            setError("Article not found");
          }
        } catch (err) {
          setError("Error fetching article");
        }
        setLoading(false);
      };

      loadArticle();
    }
  }, [slug]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    setDrawerOpen(false); // Close the drawer after navigation
    router.push(path);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        {/* Back Icon */}
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000,
          }}
        ></Box>

        {/* Drawer for Navigation */}
        <Box
          sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button onClick={() => handleNavigation("/")}>
              <ListItemText primary="Home" />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                button
                key={category}
                onClick={() =>
                  handleNavigation(`/categories/${category.toLowerCase()}`)
                }
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Blog Post Content */}
        <Paper sx={{ maxWidth: 800, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>

          {/* Blog Post Image */}
          {article.image && (
            <Box
              component="img"
              src={article.image}
              alt={article.title}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                mt: 2,
                mb: 4,
              }}
            />
          )}

          <Box
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </Paper>
      </Box>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
};

export default BlogPost;
