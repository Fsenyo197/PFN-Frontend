import axios from 'axios';
import {
  saveArticlesToIndexedDB,
  getArticlesFromIndexedDB,
} from '../utils/indexedDB';

// Helper to fetch and update articles
const FetchArticles = async () => {
  try {
    // Get cached articles from IndexedDB
    const cachedArticles = await getArticlesFromIndexedDB();

    // Fetch new articles from API
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles/`,
      {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
          'X-API-Secret': process.env.NEXT_PUBLIC_API_SECRET,
        },
      }
    );

    const fetchedArticles = response.data;

    // Find new articles that are not already in the cache
    const newArticles = fetchedArticles.filter(
      (article) => !cachedArticles.some((cached) => cached.id === article.id)
    );

    // Save only new articles to IndexedDB
    if (newArticles.length > 0) {
      await saveArticlesToIndexedDB(newArticles);
    }

    // Merge cached and new articles
    const allArticles = [...newArticles, ...cachedArticles];

    // Return the combined articles
    return allArticles;
  } catch (error) {
    // Handle the error gracefully
    return {
      error:
        'An error occurred while fetching articles. Please try again later.',
    };
  }
};

// Fetch articles by category
export const fetchArticlesByCategory = async (category) => {
  try {
    const articles = await FetchArticles();

    if (articles.error) {
      return articles;
    }

    // Filter articles by category
    const filteredArticles = articles.filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );

    return filteredArticles;
  } catch (error) {
    return {
      error:
        'An error occurred while fetching articles by category. Please try again later.',
    };
  }
};

export default FetchArticles;
