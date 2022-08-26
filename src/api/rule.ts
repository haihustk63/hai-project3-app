import axios from "axios";
import { API_ROUTES } from "src/constant";

export const ruleApi = {
  addNewRule: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.RULE, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllRules: async () => {
    try {
      const result = await axios.get(API_ROUTES.RULE);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  deleteRule: async (ruleId: string) => {
    try {
      const result = await axios.delete(`${API_ROUTES.RULE}/${ruleId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
