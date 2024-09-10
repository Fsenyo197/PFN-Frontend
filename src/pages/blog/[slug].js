import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FetchArticles from "../../utils/FetchArticles";
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

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      const loadArticle = async () => {
        setLoading(true);
        const articles = await FetchArticles();
        const selectedArticle = articles.find(
          (article) => article.slug === slug
        );
        setArticle(selectedArticle);
        setLoading(false);
      };

      loadArticle();
    }
  }, [slug]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (loading || !article) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      {/* Drawer for Navigation */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
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
          <ListItem button onClick={() => router.push("/")}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => router.push("/blog")}>
            <ListItemText primary="All Posts" />
          </ListItem>
          <ListItem button onClick={() => router.push("/categories")}>
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Blog Post Content */}
      <Paper sx={{ maxWidth: 800, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Box
          sx={{ mt: 2 }}
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </Paper>
    </Box>
  );
};

export default BlogPost;
