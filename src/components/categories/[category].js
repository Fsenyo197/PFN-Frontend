import React from "react";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../FeaturedPost";
import MostRecentPost from "../MostRecentPost";
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import Footer from "../Footer";
import Header from "../Header";

const categories = ["News", "Prices", "Payouts", "Rules", "Platforms"];

// Generate static paths for each category
export async function getStaticPaths() {
  const paths = categories.map((category) => ({
    params: { category: category.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Fetch articles for the selected category
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

// Main Category Page Component
const CategoryPage = ({ category, articles }) => {
  // Sort articles by date (most recent first)
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.date_published) - new Date(a.date_published)
  );

  // Extract the most recent post
  const mostRecentPost = sortedArticles[0];

  // Extract the featured articles (excluding the most recent one)
  const featuredArticles = sortedArticles.slice(1);

  return (
    <>
      <Header /> {/* Navigation Header */}
      <div>
        {articles.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No articles available under this category.
          </p>
        ) : (
          <>
            {/* Render MostRecentPost for the most recent article */}
            {mostRecentPost && <MostRecentPost post={mostRecentPost} />}

            {/* Render featured posts */}
            {featuredArticles.length > 0 ? (
              <Grid container>
                {featuredArticles.map((article) => (
                  <Grid item key={article.slug}>
                    <FeaturedPost post={article} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <p style={{ textAlign: "center" }}>
                No featured articles available.
              </p>
            )}
          </>
        )}
      </div>
      <Footer /> {/* Footer Component */}
    </>
  );
};

export default CategoryPage;
