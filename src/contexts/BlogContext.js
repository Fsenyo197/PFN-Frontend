"use client";

import { createContext, useContext, useState, useEffect } from "react";
import FetchCategories from "../utils/FetchCategories";
import FetchArticles from "../utils/FetchArticles";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [mostRecentPost, setMostRecentPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, articlesData] = await Promise.all([
          FetchCategories(),
          FetchArticles(),
        ]);
        setCategories(categoriesData);
        const mostRecent = articlesData[0];
        setMostRecentPost(mostRecent);
        setFeaturedPosts(articlesData.slice(1, 4));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BlogContext.Provider
      value={{ categories, mostRecentPost, featuredPosts, loading, error }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
