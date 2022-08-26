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
}

const ruleService = new RuleService();

export default ruleService;
