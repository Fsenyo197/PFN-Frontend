"use client";

import { createContext, useContext, useState, useEffect } from "react";
import FetchCategories from "../utils/FetchCategories";
import FetchArticles from "../utils/FetchArticles";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [mostRecentPost, setMostRecentPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, articlesData] = await Promise.all([
          FetchCategories(),
          FetchArticles(),
        ]);
        setCategories(categoriesData);

        const mostRecent = articlesData[0];
        setMostRecentPost({
          title: mostRecent.title,
          description: mostRecent.body,
          image: mostRecent.image,
          link: `/post/${mostRecent.slug}`,
          linkText: "Read more",
        });

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
    <BlogContext.Provider value={{ categories, mostRecentPost, featuredPosts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
