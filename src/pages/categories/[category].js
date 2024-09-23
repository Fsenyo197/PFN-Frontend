import Grid from "@mui/material/Grid";
import FeaturedPost from "../../components/FeaturedPost";
import MostRecentPost from "../../components/MostRecentPost";
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import Footer from "../Footer";
import Header from "../../components/Header"; // Import the Header component

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
