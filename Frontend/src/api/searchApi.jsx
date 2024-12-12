import axios from "axios";
import api from "config/properties";

export const searchQuery = async (query) => {
  try {
    const res = await axios.get(
      `${api.localRoute}/api/v1/books?search=${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    alert("Error searching for mentors:", error.message);
    throw error;
  }
};
