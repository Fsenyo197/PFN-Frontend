import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FetchArticles from "../../utils/FetchArticles";
import Footer from "../Footer";
import Header from "@/components/Header";
import DOMPurify from "dompurify";
import Head from "next/head";
import { Typography, Box, Paper } from "@mui/material";
import parse from "html-react-parser";
import Spinner from "@/components/Spinner";
import CssBaseline from "@mui/material/CssBaseline";
import DiscountModal from "@/components/DiscountModal";
import SocialShareButtons from "@/components/SocialShareButtons";

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
    return <Spinner />;
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

  // Sanitize the body and parse it using html-react-parser
  const sanitizedBody = DOMPurify.sanitize(article.body);

  // Define a function to handle img tag parsing and make them responsive with lazy loading
  const options = {
    replace: (domNode) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs;
        return (
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        );
      }
    },
  };

  return (
    <>
      <CssBaseline />
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.meta_description} />
        <meta name="keywords" content={article.meta_keywords} />
      </Head>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Paper elevation={0} sx={{ maxWidth: 800, p: 3 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            {article.title}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Published on:{" "}
            {new Date(article.date_published).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Category: {article.category}
          </Typography>

          {article.image && (
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={article.image}
                alt={article.title}
                loading="lazy"
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

          <Box sx={{ mt: 2, fontSize: "1.25rem", lineHeight: "1.8" }}>
            {parse(sanitizedBody, options)}
          </Box>

          {/* Conditionally render the DiscountModal if the category is "Discount Codes" */}
          {article.category === "Discount Codes" && (
            <DiscountModal discount={article} />
          )}

          {/* Use the SocialShareButtons component */}
          <SocialShareButtons shareURL={shareURL} title={article.title} />
        </Paper>
      </Box>

      <Footer />
    </>
  );
};

export default BlogPost;
