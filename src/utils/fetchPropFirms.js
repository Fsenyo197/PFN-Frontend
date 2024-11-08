import axios from "axios";

const fetchPropFirms = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/propfirms/`,
      {
        headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching prop firms:", error);
    return [];
  }
};

export default fetchPropFirms;
