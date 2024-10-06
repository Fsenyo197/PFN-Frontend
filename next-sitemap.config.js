import axios from "axios";

export default {
  siteUrl: "https://www.propfirmnews.live",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
  exclude: ["/search"],
  additionalPaths: async (config) => {
    try {
      // Use environment variable for the base URL
      const apiUrlArticles = `${process.env.NEXT_PUBLIC_BASE_URL}/articles`;
      const apiUrlCategories = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;

      // Fetch articles and categories directly with Axios
      const [articlesResponse, categoriesResponse] = await Promise.all([
        axios.get(apiUrlArticles),
        axios.get(apiUrlCategories),
      ]);

      const articles = articlesResponse.data;
      const categories = categoriesResponse.data.map(
        (category) => category.name
      ); // Assuming category objects have a `name` property

      const articlePaths = articles.map((article) => ({
        loc: `/blog/${article.slug}`,
        lastmod: article.date_published,
      }));

      const categoryPaths = categories.map((category) => {
        // Find the latest article in the category
        const latestArticle = articles
          .filter(
            (article) =>
              article.category.toLowerCase() === category.toLowerCase()
          )
          .sort(
            (a, b) => new Date(b.date_published) - new Date(a.date_published)
          )[0];

        return {
          loc: `/category/${category.toLowerCase()}`,
          lastmod: latestArticle
            ? latestArticle.date_published
            : new Date().toISOString(),
        };
      });

      return [...articlePaths, ...categoryPaths];
    } catch (error) {
      console.error("Error fetching articles or categories with Axios:", error);
      return [];
    }
  },
};
