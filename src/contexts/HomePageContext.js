import React, { createContext, useContext, useState, useEffect } from "react";
import FetchArticles from "../utils/FetchArticles";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [mostRecentPost, setMostRecentPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await FetchArticles();

        if (articlesData.length === 0) {
          throw new Error("No articles found");
        }

        const mostRecent = articlesData[0];
        setMostRecentPost({
          title: mostRecent.title,
          image: mostRecent.image,
          slug: mostRecent.slug,
          date_published: mostRecent.date_published,
        });

        setFeaturedPosts(articlesData.slice(1));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <HomePageContext.Provider
      value={{ mostRecentPost, featuredPosts, error, loading }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePage = () => useContext(HomePageContext);
