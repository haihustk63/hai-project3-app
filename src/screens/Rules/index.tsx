// Import các thư viện và module ngoài
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "src/components/AppButton";
import RuleCard from "src/components/RuleCard";
import { SCREEN_NAME } from "src/constant";
import { RuleContext } from "src/context/RuleContext";

const Rules = () => {
  const navigate = useNavigation();
  // Sử dụng các giá trị mà RuleContext cung cấp
  const {
    rules,
    rulesCondition,
    handleDeleteRule,
    setRefresh,
    handleDeleteRuleCondition,
  } = useContext(RuleContext) as any;

  // State refreshing để báo hiệu cần reload lại màn
  const [refreshing, setRefreshing] = useState(false);

  // Hàm thực hiện khi bấm xóa luật thời gian
  const handlePressButtonRuleCard = (ruleId: string) => async () => {
    await handleDeleteRule(ruleId);
  };

  // Hàm thực hiện khi bấm xóa luật phụ thuộc
  const handlePressButtonRuleCardCondition = (ruleId: string) => async () => {
    await handleDeleteRuleCondition(ruleId);
  };

  // Hàm thực hiện khi người dùng bấm thêm luật -> chuyển tới màn thêm luật
  const handleGoToAddRule = () => {
    navigate.navigate(SCREEN_NAME.AUTOMATION_RULES as any);
  };

  // Hàm thực hiện khi có yêu cầu reload lại màn
  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    });
    setRefresh(true);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.wrap}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* rules và rulesCondition được map qua sử dụng các RuleCard */}
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>Time Rule</Text>
        {rules?.map((rule: any) => (
          <RuleCard
            rule={rule}
            key={rule._id}
            onPressButton={handlePressButtonRuleCard(rule._id)}
          />
        ))}
      </View>
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>Condition Rule</Text>

        {rulesCondition?.map((rule: any) => (
          <RuleCard
            rule={rule}
            key={rule._id}
            onPressButton={handlePressButtonRuleCardCondition(rule._id)}
            condition
          />
        ))}
      </View>
      <AppButton
        title="Add Rule"
        onPress={handleGoToAddRule}
        buttonStyle={styles.buttonStyle}
      />
    </ScrollView>
  );
};

export default Rules;

// Custom style cho màn Rules
const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  rulesContainer: {
    marginBottom: 30,
  },
  rulesTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
  },
  buttonStyle: {
    marginBottom: 20
  },
});
