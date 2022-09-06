import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
} from "react-native";
import AppButton from "src/components/AppButton";
import RuleCard from "src/components/RuleCard";
import { SCREEN_NAME } from "src/constant";
import { RuleContext } from "src/context/RuleContext";

const Rules = () => {
  const navigate = useNavigation();
  const {
    rules,
    rulesCondition,
    handleDeleteRule,
    setRefresh,
    handleDeleteRuleCondition,
  } = useContext(RuleContext);

  const [refreshing, setRefreshing] = useState(false);

  const handlePressButtonRuleCard = (ruleId: string) => async () => {
    await handleDeleteRule(ruleId);
  };

  const handlePressButtonRuleCardCondition = (ruleId: string) => async () => {
    await handleDeleteRuleCondition(ruleId);
  };

  const handleGoToAddRule = () => {
    navigate.navigate(SCREEN_NAME.AUTOMATION_RULES as any);
  };

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
  buttonStyle: {},
});
