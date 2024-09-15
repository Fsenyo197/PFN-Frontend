import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import FeaturedPost from "../../components/FeaturedPost"; // Import FeaturedPost component
import { fetchArticlesByCategory } from "../../utils/FetchArticles";

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

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Articles under {category} category</h1>
      {articles.length === 0 ? (
        <p>No articles available under this category.</p>
      ) : (
        <Grid container spacing={4}>
          {articles.map((article) => (
            <FeaturedPost
              key={article.slug}
              post={{
                title: article.title,
                date: article.date_published, // Adjust to match your article data structure
                description: article.meta_description, // Adjust to match your article data
                image: article.image, // Image URL
                imageLabel: article.title,
                slug: article.slug,
              }}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CategoryPage;
