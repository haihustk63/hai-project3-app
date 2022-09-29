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

  getAllRules: async (personId: string) => {
    try {
      const result = await axios.get(API_ROUTES.RULE, { params: { personId } });
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
  addConditionRule: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.RULE_CONDITION, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllRulesCondition: async (personId: string) => {
    try {
      const result = await axios.get(API_ROUTES.RULE_CONDITION, {
        params: { personId },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  deleteRuleCondition: async (ruleId: string) => {
    try {
      const result = await axios.delete(
        `${API_ROUTES.RULE_CONDITION}/${ruleId}`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
