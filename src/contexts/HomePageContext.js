// contexts/HomePageContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import FetchCategories from "../utils/FetchCategories";
import FetchArticles from "../utils/FetchArticles";

const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [mostRecentPost, setMostRecentPost] = useState({});
  const [featuredPosts, setFeaturedPosts] = useState([]);
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
        setMostRecentPost({
          title: mostRecent.title,
          description: mostRecent.body,
          image: mostRecent.image,
          link: `/blog/${mostRecent.slug}`,
          linkText: "Read more",
        });

        setFeaturedPosts(articlesData.slice(1, 4));
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <HomePageContext.Provider
      value={{ categories, mostRecentPost, featuredPosts, error }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePage = () => useContext(HomePageContext);