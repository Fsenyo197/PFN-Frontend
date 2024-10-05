import fetchArticles from "./utils/FetchArticles.js";

export default {
  siteUrl: "https://www.propfirmnews.live",
  generateRobotsTxt: true, // Generates robots.txt
  sitemapSize: 7000, // Maximum number of URLs per sitemap file
  generateIndexSitemap: false, // Disable index sitemap
  exclude: ["/search"], // Exclude search page from sitemap
  additionalPaths: async (config) => {
    try {
      const articles = await fetchArticles();
      const categories = ["News", "Prices", "Payouts", "Rules", "Platforms"];

      const articlePaths = articles.map((article) => ({
        loc: `/blog/${article.slug}`, // Path to blog post
        lastmod: article.date_published, // Last modification date
      }));

      const categoryPaths = categories.map((category) => ({
        loc: `/category/${category.toLowerCase()}`,
        lastmod: new Date().toISOString(), // Current date as last modification date
      }));

      return [...articlePaths, ...categoryPaths];
    } catch (error) {
      console.error("Error generating additional sitemap paths:", error);
      return []; // Consider returning default paths if needed
    }
  },
};
