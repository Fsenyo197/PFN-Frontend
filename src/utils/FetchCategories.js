import axios from "axios";

const FetchCategories = async () => {
  try {
    console.log("Fetching categories...");
    const response = await axios.get(`${process.env.BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default FetchCategories;
