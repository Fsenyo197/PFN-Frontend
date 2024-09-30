import React, { createContext, useContext, useState, useEffect } from "react";
import FetchArticles from "../utils/FetchArticles";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [mostRecentPost, setMostRecentPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await FetchArticles(); // Assuming FetchArticles returns an array

        if (articlesData.length === 0) {
          throw new Error("No articles found");
        }

        const mostRecent = articlesData[0];
        setMostRecentPost({
          title: mostRecent.title,
          image: mostRecent.image,
          slug: mostRecent.slug, // Add slug for routing
          read_time: mostRecent.read_time, // Include read_time
        });

        setFeaturedPosts(articlesData.slice(1));
        setLoading(false); // Set loading to false after data is loaded
      } catch (err) {
        setError(err);
        setLoading(false); // Set loading to false in case of an error
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
