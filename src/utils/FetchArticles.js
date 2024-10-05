import axios from "axios";

const FetchArticles = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const fetchArticlesByCategory = async (category) => {
  try {
    const articles = await FetchArticles();
    return articles.filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return [];
  }
};

export default FetchArticles;
