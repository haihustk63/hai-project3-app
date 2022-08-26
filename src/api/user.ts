import axios from "axios";
import { API_ROUTES } from "src/constant";

export const userApi = {
  login: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.USER_LOGIN, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  register: async (data: any) => {
    try {
      await axios.post(API_ROUTES.USER, data);
    } catch (error) {
      console.log(error);
    }
  },
};
