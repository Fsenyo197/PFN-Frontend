import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton"; // Import MUI IconButton
import HomeIcon from "@mui/icons-material/Home"; // Import Home Icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import Back Icon
import FeaturedPost from "../../components/FeaturedPost"; // Import FeaturedPost component
import MostRecentPost from "../../components/MostRecentPost"; // Import MostRecentPost component
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import Footer from "../Footer";

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

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  const handleHome = () => {
    router.push("/"); // Navigate to the homepage
  };

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  // Sort articles by date (assuming articles have a date_published field)
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date_published) - new Date(a.date_published)
  );

  // Get the most recent post (the first article after sorting)
  const mostRecentPost = sortedArticles[0];

  // Get the rest of the articles excluding the most recent one
  const featuredArticles = sortedArticles.slice(1);

  return (
    <>
      <div style={{ maxWidth: "1200px" }}>
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
            <ArrowBackIcon sx={{ color: "#02353C" }} />
          </IconButton>
          <IconButton onClick={handleHome} aria-label="Go to home">
            <HomeIcon sx={{ color: "#02353C" }} />
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
          <>
            {/* Render MostRecentPost for the most recent article */}
            {mostRecentPost && (
              <MostRecentPost
                post={{
                  title: mostRecentPost.title,
                  date: mostRecentPost.date_published,
                  description: mostRecentPost.meta_description,
                  image: mostRecentPost.image,
                  slug: mostRecentPost.slug,
                }}
              />
            )}

            {/* Render featured posts */}
            <Grid container spacing={3}>
              {featuredArticles.map((article) => (
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
          </>
        )}
      </div>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
};

export default CategoryPage;
