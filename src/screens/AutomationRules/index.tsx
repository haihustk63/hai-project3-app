// import từ các thư viện và module ngoài
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
import { AuthContext } from "src/context/AuthContext";
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

/* 
Giá trị khởi tạo truyền cho form gồm:
name: Tên luật
---Luật thời gian
device: Thiết bị thực hiện
onTime: Thời gian bật
offTime: Thời gian tắt
---Luật phụ thuộc
preDevice: Id của thiết bị điều kiện
preValue: Giá trị thiết bị điều kiện
afterDevice: Id của thiết bị phụ thuộc
afterValue: Giá trị của thiết bị phụ thuộc
*/
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
  // Sử dụng các giá trị mà RuleContext cung cấp
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

  // Sử dụng state info của AuthContext
  const { info = {} } = useContext(AuthContext) as any;

  const navigate = useNavigation();

  const ref = useRef(null) as any;

  // Hàm thực hiện khi submit form
  const handleSubmitForm = async (values: any) => {
    if (info?.id) {
      return;
    }

    /*
    Đối với luật phụ thuộc, ta cần check thiết bị điều kiện và thiết bị phụ thuộc
    có trùng nhau không (mong muốn là không) và luật đó đã tồn tại hay chưa.

    Đối với luật theo thời gian, ta check nếu cả thời gian bật và tắt đều được chọn, 
    thì hai thời gian này không được trùng nhau.

    Nếu thỏa mãn, thêm luật đó.
    */
    if (modeCondition) {
      let { preDevice, preValue, afterDevice, afterValue, name } = values;
      preValue = preValue === "on" ? 1 : 0;
      afterValue = afterValue === "on" ? 1 : 0;

      if (preDevice === afterDevice) {
        setErrorRuleCondition(true);
        return;
      }

      const index = rulesCondition?.findIndex(
        (r: any) =>
          r.preDeviceId?._id === preDevice &&
          r.preValue === preValue &&
          r.afterDeviceId?._id === afterDevice &&
          r.afterValue === afterValue
      );

      if (index < 0) {
        const rule = {
          name,
          preDeviceId: preDevice,
          preValue,
          afterDeviceId: afterDevice,
          afterValue,
          personId: info.id,
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

      // Chuyển về định dạng này để sử dụng node-cron ở server
      const cronOnTime = `00 ${onTimeMinute} ${onTimeHour} * * *`;
      const cronOffTime = `00 ${offTimeMinute} ${offTimeHour} * * *`;

      const rule = {
        name,
        device,
        cronOnTime,
        cronOffTime,
        personId: info.id,
      } as any;

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

    // Sau khi thêm luật xong trở về màn danh sách luật
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
          // Sử dụng lược đồ validate tùy vào luật thời gian hay luật phụ thuộc
          validationSchema={
            modeCondition ? addAutomationRuleCondition : addAutomationRuleTime
          }
          innerRef={ref}
        >
          {({ handleSubmit }) => (
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
                <Text style={styles.messageError}>
                  This rule is existed or both devices are the same!
                </Text>
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

// Custom style cho AutomationRules
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
