import Grid from "@mui/material/Grid";
import FeaturedPost from "../../components/FeaturedPost";
import MostRecentPost from "../../components/MostRecentPost";
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import Footer from "../Footer";
import Header from "../../components/Header";

export async function getStaticPaths() {
  const categories = ["News", "Payouts", "Rules", "Prop Firms"];

  const paths = categories.map((category) => ({
    params: { category: category.toLowerCase().replace(/\s+/g, "-") }, 
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const category = params.category.replace(/-/g, " "); 
  const articles = await fetchArticlesByCategory(category);

  return {
    props: {
      category,
      articles,
    },
  };
}

const CategoryPage = ({ category, articles }) => {
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
      <Header /> {/* Use Header component for navigation */}
      <div style={{ padding: "0 16px" }}>
        {articles.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No articles available under this category.
          </p>
        ) : (
          <>
            {/* Render MostRecentPost for the most recent article */}
            {mostRecentPost && <MostRecentPost post={mostRecentPost} />}

            {/* Render featured posts */}
            <Grid container spacing={3}>
              {featuredArticles.map((article) => (
                <Grid item key={article.slug}>
                  <FeaturedPost post={article} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
