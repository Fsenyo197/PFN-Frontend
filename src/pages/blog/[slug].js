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
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share"; // For the generic share button
import TelegramIcon from "@mui/icons-material/Telegram"; // For Telegram icon
import FacebookIcon from "@mui/icons-material/Facebook"; // For Facebook icon
import TwitterIcon from "@mui/icons-material/Twitter"; // For X (formerly Twitter) icon
import { useHeader } from "../../contexts/HeaderContext";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [shareURL, setShareURL] = useState(""); // State for storing the share URL
  const { categories } = useHeader();

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

  // Set the share URL only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareURL(window.location.href);
    }
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    setDrawerOpen(false);
    router.push(path);
  };

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: "Check out this article!",
          url: shareURL,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      console.log("Sharing not supported on this browser");
    }
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
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon sx={{ color: "#02353C" }} />
        </IconButton>

        <IconButton onClick={handleBack} aria-label="Go back" sx={{ ml: 2 }}>
          <ArrowBackIcon sx={{ color: "#02353C" }} />
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

      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Paper sx={{ maxWidth: 800, p: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#02353C" }}>
            {article.title}
          </Typography>

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

          {/* Social Share Buttons */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-around" }}>
            <IconButton
              color="primary"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareURL
              )}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              aria-label="Share on X"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="primary"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareURL
              )}`}
              target="_blank"
              aria-label="Share on Facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="primary"
              href={`https://t.me/share/url?url=${encodeURIComponent(
                shareURL
              )}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              aria-label="Share on Telegram"
            >
              <TelegramIcon />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handleShare}
              aria-label="Share"
            >
              <ShareIcon />
            </IconButton>
          </Box>
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
