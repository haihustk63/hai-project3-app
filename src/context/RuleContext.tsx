// import từ thư viện react các hooks và hàm createContext
import { createContext, useContext, useEffect, useState } from "react";

// import ruleService và AuthContext
import ruleService from "src/services/rule";
import { AuthContext } from "./AuthContext";

// Tạo RuleContext bằng hàm createContext
export const RuleContext = createContext({}) as any;

const RuleProvider = ({ children }: { children: any }) => {
  /*
  Các state được quản lý:
  ---FORM
  onTimeSwitch: Switch chọn thời gian bật thiết bị
  offTimeSwitch: Switch chọn thời gian tắt thiết bị
  modeCondition: Chọn mode luật theo thời gian hay luật phụ thuộc
  error: Lỗi trong quá trình tạo luật theo thời gian
  errorRuleCondition: Lỗi trong quá trình tạo luật phụ thuộc
  ---OTHERS
  rules: Danh sách các luật theo thời gian
  rulesCondition: Danh sách các luật phụ thuộc
  refresh: Khi refresh là true sẽ lấy lại danh sách các luật
  */
  const [onTimeSwitch, setOnTimeSwitch] = useState(false);
  const [offTimeSwitch, setOffTimeSwitch] = useState(false);
  const [modeCondition, setModeCondition] = useState(false);
  const [error, setError] = useState(false);
  const [errorRuleCondition, setErrorRuleCondition] = useState(false);
  const [rules, setRules] = useState([]);
  const [rulesCondition, setRulesCondition] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Lấy ra info từ AuthContext
  const { info = {} } = useContext(AuthContext) as any;

  // Khi app render lần đầu tiên sẽ lấy danh sách các luật
  useEffect(() => {
    const getAllRules = async () => {
      if (info?.id) {
        await handleGetRules(info.id);
        await handleGetRulesCondition(info.id);
      }
    };

    getAllRules();
  }, []);

  // Khi refresh là true hoặc info thay đổi sẽ lấy lại danh sách thiết bị
  useEffect(() => {
    const getAllRules = async () => {
      if (info?.id) {
        await handleGetRules(info.id);
        await handleGetRulesCondition(info.id);
      }
      setRefresh(false);
    };

    if (refresh || info) {
      getAllRules();
    }
  }, [refresh, info]);

  // Hàm thay đổi switch chọn thời gian bật
  const handleToggleOnTime = () => {
    setOnTimeSwitch(!onTimeSwitch);
    setError(false);
  };

  // Hàm thay đổi switch chọn thời gian tắt
  const handleToggleOffTime = () => {
    setOffTimeSwitch(!offTimeSwitch);
    setError(false);
  };

  // Hàm này sẽ đưa cả switch chọn thời gian bật và tắt về mode OFF
  const handleResetSwitchTime = () => {
    setOnTimeSwitch(false);
    setOffTimeSwitch(false);
  };

  // Thay đổi chế độ thêm luật thời gian hay luật phụ thuộc
  const handleToggleMode = () => {
    setModeCondition(!modeCondition);
    setError(false);
    setErrorRuleCondition(false);
  };

  // Hàm thêm một luật thời gian. Sau khi thêm sau đặt lại các state về mặc định
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

  // Hàm thêm một luật tự động. Sau khi thêm sau đặt lại các state về mặc định
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

  // Hàm lấy tất cả các luật thời gian
  const handleGetRules = async (personId: string) => {
    try {
      const result = await ruleService.getRules(personId);
      const data = result?.data;
      setRules(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm lấy tất cả các luật phụ thuộc
  const handleGetRulesCondition = async (personId: string) => {
    try {
      const result = await ruleService.getRulesCondition(personId);
      const data = result?.data;
      setRulesCondition(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xóa một luật thời gian
  const handleDeleteRule = async (ruleId: string) => {
    try {
      await ruleService.deleteRule(ruleId);
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xóa một luật phụ thuộc
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
