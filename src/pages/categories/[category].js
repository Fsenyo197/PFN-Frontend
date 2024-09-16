import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FeaturedPost from "../../components/FeaturedPost";
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import { useHeader } from "../../contexts/HeaderContext";

export async function getStaticPaths() {
  const categories = ["News", "Prices", "Payouts", "Rules", "Trading Platform"];

  const paths = categories.map((category) => ({
    params: { category: category.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = params.category;
  const articles = await fetchArticlesByCategory(category);

  return {
    props: {
      category,
      articles,
    },
  };
}

const CategoryPage = ({ category, articles }) => {
  const router = useRouter();
  const { categories } = useHeader();

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  const handleHome = () => {
    router.push("/"); // Navigate to the homepage
  };

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "900px", width: "100%" }}>
        {" "}
        {/* Center the content */}
        <h1>Articles under {category} category</h1>
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
        {articles.length === 0 ? (
          <p>No articles available under this category.</p>
        ) : (
          <Grid container spacing={4}>
            {articles.map((article) => (
              <FeaturedPost
                key={article.slug}
                post={{
                  title: article.title,
                  date: article.date_published,
                  description: article.meta_description,
                  image: article.image,
                  imageLabel: article.title,
                  slug: article.slug,
                }}
              />
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
