import axios from "axios";

const FetchArticles = async () => {
  try {
    const response = await axios.get(
      `${process.env.SENSITIVE_API_BASE_URL}/articles/`,
      {
        headers: {
          "X-API-Key": process.env.SENSITIVE_API_KEY,
          "X-API-Secret": process.env.SENSITIVE_API_SECRET,
        },
      }
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
    const filteredArticles = articles.filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );
    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return [];
  }
};

export default FetchArticles;
