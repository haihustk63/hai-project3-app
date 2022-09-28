import { createContext, useEffect, useState } from "react";
import ruleService from "src/services/rule";

export const RuleContext = createContext({}) as any;

const RuleProvider = ({ children }: { children: any }) => {
  const [onTimeSwitch, setOnTimeSwitch] = useState(false);
  const [offTimeSwitch, setOffTimeSwitch] = useState(false);
  const [modeCondition, setModeCondition] = useState(false);
  const [error, setError] = useState(false);
  const [errorRuleCondition, setErrorRuleCondition] = useState(false);
  const [rules, setRules] = useState([]);
  const [rulesCondition, setRulesCondition] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getAllRules = async () => {
      await handleGetRules();
      await handleGetRulesCondition();
    };

    getAllRules();
  }, []);

  useEffect(() => {
    const getAllRules = async () => {
      await handleGetRules();
      await handleGetRulesCondition();
      setRefresh(false);
    };

    if (refresh) {
      getAllRules();
    }
  }, [refresh]);

  const handleToggleOnTime = () => {
    setOnTimeSwitch(!onTimeSwitch);
    setError(false);
  };

  const handleToggleOffTime = () => {
    setOffTimeSwitch(!offTimeSwitch);
    setError(false);
  };

  const handleResetSwitchTime = () => {
    setOnTimeSwitch(false);
    setOffTimeSwitch(false);
  };

  const handleToggleMode = () => {
    setModeCondition(!modeCondition);
    setError(false);
    setErrorRuleCondition(false);
  };

  const handleAddRule = async (data: any) => {
    try {
      const result = await ruleService.addRule(data);
      setRefresh(true);
      setModeCondition(false);
      setOnTimeSwitch(false);
      setOffTimeSwitch(false);
      setError(false);
      setErrorRuleCondition(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddRuleCondition = async (data: any) => {
    try {
      const result = await ruleService.addRuleCondition(data);
      setRefresh(true);
      setModeCondition(false);
      setOnTimeSwitch(false);
      setOffTimeSwitch(false);
      setError(false);
      setErrorRuleCondition(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRules = async () => {
    try {
      const result = await ruleService.getRules();
      const data = result?.data;
      setRules(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetRulesCondition = async () => {
    try {
      const result = await ruleService.getRulesCondition();
      const data = result?.data;
      setRulesCondition(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    try {
      await ruleService.deleteRule(ruleId);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRuleCondition = async (ruleId: string) => {
    try {
      await ruleService.deleteRuleCondition(ruleId);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RuleContext.Provider
      value={{
        onTimeSwitch,
        offTimeSwitch,
        handleToggleOffTime,
        handleToggleOnTime,
        error,
        setError,
        errorRuleCondition,
        setErrorRuleCondition,
        handleAddRule,
        rules,
        handleGetRules,
        setRefresh,
        handleDeleteRule,
        handleDeleteRuleCondition,
        modeCondition,
        handleToggleMode,
        handleResetSwitchTime,
        rulesCondition,
        handleAddRuleCondition,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

export default RuleProvider;
