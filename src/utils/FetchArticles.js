import axios from "axios";

const FetchArticles = async () => {
  try {
    console.log("Fetching articles...");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/articles/`
    );
    console.log("Articles fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export default FetchArticles;
