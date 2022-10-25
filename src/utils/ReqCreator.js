import axios from "axios";
import { BASE_URL, STORAGE_KEYS } from "./constants";

export const reqFunc = async ({ url, body, type, params }) => {
  try {
    return await axios.request({
      method: type,
      baseURL: BASE_URL,
      url,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(STORAGE_KEYS.token),
      },
      params,
      data: body,
    });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.token);
    }
    throw new Error(error);
  }
};
