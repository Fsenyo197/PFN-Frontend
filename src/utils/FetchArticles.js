import axios from "axios";

const FetchArticles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export default FetchArticles;
