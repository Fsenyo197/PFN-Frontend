import axios from "axios";

const FetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default FetchCategories;
