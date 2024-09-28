import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify
import FetchArticles from "../../utils/FetchArticles";
import Footer from "../Footer";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  IconButton,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import DrawerComponent from "../../components/DrawerComponent";
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
            // Sanitize the article body before setting it
            const sanitizedBody = DOMPurify.sanitize(selectedArticle.body, {
              USE_PROFILES: { html: true }, // Use default HTML sanitization
            });

            setArticle({ ...selectedArticle, body: sanitizedBody });
          } else {
            setError("Article not found");
          }
        } catch (err) {
          console.error(err);
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
    setDrawerOpen(false); // Close the drawer after navigation
    router.push(path);
  };

  const handleBack = () => {
    router.back(); // Navigate back
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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      {/* Navigation and Drawer */}
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <DrawerComponent
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          categories={categories}
          handleNavigation={handleNavigation}
        />

        <IconButton onClick={handleBack} aria-label="Go back" sx={{ ml: 2 }}>
          <ArrowBackIcon sx={{ color: "#02353C" }} />
        </IconButton>
      </Box>

      {/* Main Article Content */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {article.title}
          </Typography>

          {article.image && (
            <Box
              component="img"
              src={article.image}
              alt={article.image_credit || "Article Image"}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                mt: 2,
                mb: 4,
              }}
            />
          )}

          {/* Render sanitized HTML */}
          <Box
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Social Share Buttons */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <IconButton
              color="primary"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareURL
              )}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <TwitterIcon />
            </IconButton>

            <IconButton
              color="primary"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareURL
              )}`}
              target="_blank"
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
              aria-label="Share on Telegram"
            >
              <TelegramIcon />
            </IconButton>

            <IconButton
              color="primary"
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: article.title,
                      url: shareURL,
                    })
                    .catch((error) => console.error("Error sharing:", error));
                }
              }}
              aria-label="Share"
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
};

export default BlogPost;
