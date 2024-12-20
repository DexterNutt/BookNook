import axios from "axios";
import { api } from "../config/properties";

export const searchQuery = async (query) => {
  try {
    const res = await axios.get(`${api.localRoute}/api/books?search=${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};
