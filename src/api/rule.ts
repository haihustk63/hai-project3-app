// import thư viện axios
import axios from "axios";

// import API_ROUTES từ constants
import { API_ROUTES } from "src/constant";

// ruleApi chứa các hàm gọi đến api phần rules
export const ruleApi = {
  // Hàm này giúp thêm một luật theo thời gian vào hệ thống
  addNewRule: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.RULE, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // Hàm này lấy tất cả các luật theo thời gian, theo id của người dùng (personId)
  getAllRules: async (personId: string) => {
    try {
      const result = await axios.get(API_ROUTES.RULE, { params: { personId } });
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // Hàm xóa một luật theo thời gian, dựa vào id của luật (ruleId)
  deleteRule: async (ruleId: string) => {
    try {
      const result = await axios.delete(`${API_ROUTES.RULE}/${ruleId}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // Thêm một luật phụ thuộc (condition rule)
  addConditionRule: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.RULE_CONDITION, data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // Lấy tất cả các luật phụ thuộc theo id của người dùng (personId)
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

  // Xóa một luật phụ thuộc dựa vào id của luật (ruleId)
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
