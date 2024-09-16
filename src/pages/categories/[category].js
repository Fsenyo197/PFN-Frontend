import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FeaturedPost from "../../components/FeaturedPost";
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import { useHeader } from "../../contexts/HeaderContext";
import Footer from "../../components/Footer"; // Import the Footer component

const CategoryPage = ({ category, articles }) => {
  const router = useRouter();
  const { categories } = useHeader();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Back and Home icons with space between */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={handleBack} aria-label="Go back">
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleHome} aria-label="Go to home">
          <HomeIcon />
        </IconButton>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1>Articles under {category} category</h1>
      </div>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No articles available under this category.
        </p>
      ) : (
        <Grid>
          {articles.map((article) => (
            <Grid item key={article.slug}>
              <FeaturedPost
                post={{
                  title: article.title,
                  date: article.date_published,
                  description: article.meta_description,
                  image: article.image,
                  imageLabel: article.title,
                  slug: article.slug,
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Footer here */}
      <Footer
        title="Footer Title"
        description="Some description about the blog"
      />
    </div>
  );
};

export default CategoryPage;
