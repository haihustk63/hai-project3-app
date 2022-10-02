// import ruleApi từ thư mục api/rule
import { ruleApi } from "src/api/rule";

// Định nghĩa lớp RuleService chứa các hàm gọi đến userApi
class RuleService {
  addRule = async (data: any) => {
    await ruleApi.addNewRule(data);
  };

  getRules = async (personId: string) => {
    return await ruleApi.getAllRules(personId);
  };

  deleteRule = async (ruleId: string) => {
    return await ruleApi.deleteRule(ruleId);
  };

  addRuleCondition = async (data: any) => {
    await ruleApi.addConditionRule(data);
  };

  getRulesCondition = async (personId: string) => {
    return await ruleApi.getAllRulesCondition(personId);
  };

  deleteRuleCondition = async (ruleId: string) => {
    return await ruleApi.deleteRuleCondition(ruleId);
  };
}

// Tạo ra một thể hiện của lớp RuleService và export cho nơi khác sử dụng
const ruleService = new RuleService();

export default ruleService;
