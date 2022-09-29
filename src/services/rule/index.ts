import { ruleApi } from "src/api/rule";

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

const ruleService = new RuleService();

export default ruleService;
