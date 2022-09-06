import { ruleApi } from "src/api/rule";

class RuleService {
  addRule = async (data: any) => {
    await ruleApi.addNewRule(data);
  };

  getRules = async () => {
    return await ruleApi.getAllRules();
  };

  deleteRule = async (ruleId: string) => {
    return await ruleApi.deleteRule(ruleId);
  };

  addRuleCondition = async (data: any) => {
    await ruleApi.addConditionRule(data);
  };

  getRulesCondition = async () => {
    return await ruleApi.getAllRulesCondition();
  };

  deleteRuleCondition = async (ruleId: string) => {
    return await ruleApi.deleteRuleCondition(ruleId);
  };
}

const ruleService = new RuleService();

export default ruleService;
