import axios from "axios";
import { saveArticlesToIndexedDB, getArticlesFromIndexedDB } from "../utils/indexedDB";

const FetchArticles = async () => {
  try {
    // Try to get articles from IndexedDB first
    const cachedArticles = await getArticlesFromIndexedDB();
    if (cachedArticles.length > 0) {
      console.log("Using cached articles from IndexedDB");
      return cachedArticles;
    }

    // Fetch articles from the API if not in IndexedDB
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles/`,
      {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
          "X-API-Secret": process.env.NEXT_PUBLIC_API_SECRET,
        },
      }
    );

    const articles = response.data;

    // Save the fetched articles to IndexedDB
    await saveArticlesToIndexedDB(articles);

    return articles;
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
