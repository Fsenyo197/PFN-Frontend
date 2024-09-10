import { useRouter } from "next/router";
import Link from "next/link";
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

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Articles under {category} category</h1>
      {articles.length === 0 ? (
        <p>No articles available under this category.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
