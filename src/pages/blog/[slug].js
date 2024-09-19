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
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArticleIcon from "@mui/icons-material/Article"; // Icon for "News"
import PriceCheckIcon from "@mui/icons-material/PriceCheck"; // Icon for "Prices"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // Icon for "Payouts"
import GavelIcon from "@mui/icons-material/Gavel"; // Icon for "Rules"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Icon for "Trading Platform"
import { useHeader } from "../../contexts/HeaderContext";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [shareURL, setShareURL] = useState("");
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

  const categoryIcons = {
    News: <ArticleIcon />,
    Prices: <PriceCheckIcon />,
    Payouts: <MonetizationOnIcon />,
    Rules: <GavelIcon />,
    "Trading Platform": <AccountBalanceIcon />,
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
          <ListItemButton onClick={() => handleNavigation("/")}>
            <ListItemText primary="Home" />
          </ListItemButton>
          {categories.map((category) => (
            <ListItemButton
              key={category}
              onClick={() =>
                handleNavigation(`/categories/${category.toLowerCase()}`)
              }
            >
              <ListItemIcon>{categoryIcons[category]}</ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
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
            <Box sx={{ textAlign: "center" }}>
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
              <Typography variant="caption">X</Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
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
              <Typography variant="caption">Facebook</Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
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
              <Typography variant="caption">Telegram</Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <IconButton
                color="primary"
                onClick={handleShare}
                aria-label="Share"
              >
                <ShareIcon />
              </IconButton>
              <Typography variant="caption">Share</Typography>
            </Box>
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
