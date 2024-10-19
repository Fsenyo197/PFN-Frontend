import Grid from "@mui/material/Grid";
import FeaturedPost from "../../components/FeaturedPost";
import MostRecentPost from "../../components/MostRecentPost";
import { fetchArticlesByCategory } from "../../utils/FetchArticles";
import Footer from "../Footer";
import Header from "../../components/Header";
import Head from "next/head";

export async function getStaticPaths() {
  const categories = ["Prop News", "Payouts", "Trading Rules", "Prop Firms"];

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

  const categoriesData = [
    {
      name: "Prop News",
      description: "Stay informed with the latest prop firm news, updates, and industry insights. Discover important trends and developments shaping the prop trading world.",
    },
    {
      name: "Payouts",
      description: "Learn about prop firm payouts, policies, and conditions. Get the most up-to-date information on how different firms structure their trader payouts.",
    },
    {
      name: "Trading Rules",
      description: "Understand the rules governing prop firms. Explore detailed overviews of trading regulations, risk management, and conditions you must follow.",
    }, 
    {
      name: "Prop Firms",
      description: "Explore reviews and comparisons of leading prop firms. Find out which firms offer the best opportunities for aspiring traders.",
    },
  ];

  const categoryData = categoriesData.find(cat => cat.name.toLowerCase() === category.toLowerCase());
  const description = categoryData.description;

  return {
    props: {
      category,
      articles,
      description, 
    },
    revalidate: 60, 
  };
}

const CategoryPage = ({ category, articles, description }) => {
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
      <Head>
        <title>{category}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
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
            <Grid container>
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
