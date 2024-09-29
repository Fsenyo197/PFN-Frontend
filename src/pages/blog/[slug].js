import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FetchArticles from "../../utils/FetchArticles";
import Footer from "../Footer";
import DOMPurify from "dompurify";
import {
  CircularProgress,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareURL, setShareURL] = useState("");

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
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Paper sx={{ maxWidth: 800, p: 3 }}>
          <Typography variant="h4">{article.title}</Typography>

          {article.image && (
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={article.image}
                alt={article.title} // Use a more descriptive alt text
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  mt: 2,
                  mb: 1,
                }}
              />
              {article.image_credit && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "#666",
                    textAlign: "center",
                    fontSize: "0.875rem",
                    mb: 4,
                  }}
                >
                  {article.image_credit}
                </Typography>
              )}
            </Box>
          )}

          <Box
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.body), // Sanitize HTML content
            }}
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
                onClick={() =>
                  navigator.share({ title: article.title, url: shareURL })
                }
                aria-label="Share"
              >
                <ShareIcon />
              </IconButton>
              <Typography variant="caption">Share</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default BlogPost;
