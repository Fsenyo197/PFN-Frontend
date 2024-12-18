import axios from "axios";

export default {
  siteUrl: "https://www.propfirmnews.live",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  exclude: ["/search"],
  additionalPaths: async (config) => {
    try {
      const {
        NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_API_KEY,
        NEXT_PUBLIC_API_SECRET,
      } = process.env;

      if (
        !NEXT_PUBLIC_BASE_URL ||
        !NEXT_PUBLIC_API_KEY ||
        !NEXT_PUBLIC_API_SECRET
      ) {
        throw new Error(
          "Environment variables (NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_SECRET) are not properly defined."
        );
      }

      // API Endpoints
      const apiUrlArticles = `${NEXT_PUBLIC_BASE_URL}/articles`;
      const apiUrlCategories = `${NEXT_PUBLIC_BASE_URL}/categories`;

      // Fetch articles, categories, and prop firms
      const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get(apiUrlArticles),
        axios.get(apiUrlCategories, {
          headers: {
            "X-API-Key": NEXT_PUBLIC_API_KEY,
            "X-API-Secret": NEXT_PUBLIC_API_SECRET,
          },
        }),
      ]);

      const articles = articlesResponse.data;
      const categories = categoriesResponse.data;

      // Map articles to sitemap paths
      const articlePaths = articles.map((article) => ({
        loc: `/blog/${article.slug}`,
        lastmod: article.date_published,
      }));

      // Map categories to sitemap paths
      const categoryPaths = categories.map((category) => {
        const latestArticle = articles
          .filter(
            (article) =>
              article.category.toLowerCase() === category.name.toLowerCase()
          )
          .sort(
            (a, b) => new Date(b.date_published) - new Date(a.date_published)
          )[0];

        return {
          loc: `/category/${category.name.toLowerCase()}`,
          lastmod: latestArticle
            ? latestArticle.date_published
            : new Date().toISOString(),
        };
      });

      // Map prop firm comparison paths
      const comparisonPaths = [
        "/compare/country",
        "/compare/payout-options",
        "/compare/platforms",
        "/compare/year-established",
        "/compare/rules",
        "/compare/best-choices",
      ].map((path) => ({
        loc: path,
        lastmod: new Date().toISOString(),
      }));

      return [...articlePaths, ...categoryPaths, ...comparisonPaths];
    } catch (error) {
      console.error(
        "Error generating additional sitemap paths:",
        error.message
      );
      return [];
    }
  },
};
