import { useNavigation } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import { Formik } from "formik";
import { useContext, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "src/components/AppButton";
import { SCREEN_NAME } from "src/constant";
import { RuleContext } from "src/context/RuleContext";

import {
  addAutomationRuleCondition,
  addAutomationRuleTime,
  ADD_NEW_RULES_FIELD,
} from "src/schemas";
import GroupField from "./GroupField";

const {
  NAME,
  DEVICE,
  ON_TIME,
  OFF_TIME,
  PRE_DEVICE,
  PRE_VALUE,
  AFTER_DEVICE,
  AFTER_VALUE,
} = ADD_NEW_RULES_FIELD;

const initialValues = {
  [NAME]: "",
  [DEVICE]: "",
  [ON_TIME]: new Date(),
  [OFF_TIME]: new Date(),
  [PRE_DEVICE]: "",
  [PRE_VALUE]: "",
  [AFTER_DEVICE]: "",
  [AFTER_VALUE]: "",
};

const AutomationRules = () => {
  const {
    onTimeSwitch,
    offTimeSwitch,
    error,
    setError,
    handleAddRule,
    modeCondition,
    rulesCondition,
    errorRuleCondition,
    setErrorRuleCondition,
    handleAddRuleCondition,
  } = useContext(RuleContext) as any;

  const navigate = useNavigation();

  const ref = useRef(null) as any;

  const handleSubmitForm = async (values: any) => {
    if (modeCondition) {
      const { preDevice, preValue, afterDevice, afterValue, name } = values;

      const index = rulesCondition?.findIndex(
        (r: any) =>
          r.preDeviceId === preDevice &&
          r.preValue === preValue &&
          r.afterDeviceId === afterDevice &&
          r.afterValue === afterValue
      );

      if (index < 0) {
        const rule = {
          name,
          preDeviceId: preDevice,
          preValue: preValue === "on" ? 1 : 0,
          afterDeviceId: afterDevice,
          afterValue: afterValue === "on" ? 1 : 0,
        };

        await handleAddRuleCondition(rule);
      } else {
        setErrorRuleCondition(true);
        return;
      }
    } else {
      const { onTime, offTime, device, name } = values;

      const onTimeMinute = onTime.getMinutes();
      const onTimeHour = onTime.getHours();
      const offTimeMinute = offTime.getMinutes();
      const offTimeHour = offTime.getHours();

      if (
        onTimeSwitch &&
        offTimeSwitch &&
        onTimeMinute === offTimeMinute &&
        onTimeHour === offTimeHour
      ) {
        setError(true);
        return;
      }

      const cronOnTime = `00 ${onTimeMinute} ${onTimeHour} * * *`;
      const cronOffTime = `00 ${offTimeMinute} ${offTimeHour} * * *`;

      const rule = { name, device, cronOnTime, cronOffTime } as any;

      if (!onTimeSwitch && !offTimeSwitch) {
        setError(true);
        return;
      }

      if (!onTimeSwitch) {
        delete rule.cronOnTime;
      }

      if (!offTimeSwitch) {
        delete rule.cronOffTime;
      }

      await handleAddRule(rule);
    }

    navigate.navigate(SCREEN_NAME.RULES as any);
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        enabled
        style={styles.pContainer}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validationSchema={
            modeCondition ? addAutomationRuleCondition : addAutomationRuleTime
          }
          innerRef={ref}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <View style={styles.container}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/druoyiv0j/image/upload/v1660299672/dev/smart-home_hzbyxz.jpg",
                }}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
              />
              <GroupField />
              {error && !modeCondition && (
                <Text style={styles.messageError}>
                  Please choose on time or off time or both (on time is
                  different from off time)
                </Text>
              )}
              {errorRuleCondition && modeCondition && (
                <Text style={styles.messageError}>This rule is existed!</Text>
              )}
              <AppButton
                title="OK"
                onPress={handleSubmit}
                buttonStyle={styles.button}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AutomationRules;

const styles = StyleSheet.create({
  pContainer: {
    minHeight: "100%",
  },
  container: {
    borderRadius: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 2,
    // borderRadius: 5
    // height:
  },
  messageError: {
    marginBottom: 20,
    marginLeft: 14,
    color: "#ff0000",
  },

  button: {
    marginBottom: 10,
    marginHorizontal: 14,
  },
});
