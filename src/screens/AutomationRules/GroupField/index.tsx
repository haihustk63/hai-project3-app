import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, Switch } from "@rneui/themed";
import { useFormikContext } from "formik";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ErrorMessage from "src/components/ErrorMessage";
import { DeviceContext } from "src/context/DeviceContect";
import { RuleContext } from "src/context/RuleContext";
import { ADD_NEW_RULES_FIELD } from "../../../schemas";

const { NAME, DEVICE, ON_TIME, OFF_TIME } = ADD_NEW_RULES_FIELD;

const GroupField = () => {
  const { values, handleChange, handleBlur, setFieldValue, errors, touched } =
    useFormikContext();

  const { selectDataDevice = [] } = useContext(DeviceContext);

  const {
    onTimeSwitch,
    offTimeSwitch,
    handleToggleOnTime,
    handleToggleOffTime,
    setError,
  } = useContext(RuleContext);

  const handleDateChange = (field: string) => (e: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setFieldValue(field, currentDate);
  };

  const handleToggleTime = (cb: any) => () => {
    setFieldValue(ON_TIME, new Date());
    setFieldValue(OFF_TIME, new Date());

    cb();
  };

  return (
    <View style={styles.container}>
      <Input
        value={(values as any)[NAME]}
        placeholder="Enter rule name"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(NAME)}
        onBlur={handleBlur(NAME)}
      />
      <ErrorMessage errors={errors} touched={touched} field={NAME} />

      <RNPickerSelect
        onValueChange={handleChange(DEVICE)}
        items={selectDataDevice}
        placeholder={{ label: "Select device", value: "" }}
        value={(values as any)[DEVICE] || ""}
        style={pickerStyle}
      />
      <ErrorMessage errors={errors} touched={touched} field={DEVICE} />

      <View style={styles.dateSelect}>
        <View style={styles.dateSelectSwitch}>
          <Text style={styles.dateSelectTitle}>On Time</Text>
          <Switch
            value={onTimeSwitch}
            onValueChange={handleToggleTime(handleToggleOnTime)}
          />
        </View>
        {onTimeSwitch && (
          <DateTimePicker
            value={(values as any)[ON_TIME]}
            is24Hour
            onChange={handleDateChange(ON_TIME)}
            mode="time"
            style={styles.date}
          />
        )}
      </View>

      <View style={styles.dateSelect}>
        <View style={styles.dateSelectSwitch}>
          <Text style={styles.dateSelectTitle}>Off Time</Text>
          <Switch
            value={offTimeSwitch}
            onValueChange={handleToggleTime(handleToggleOffTime)}
          />
        </View>
        {offTimeSwitch && (
          <DateTimePicker
            value={(values as any)[OFF_TIME]}
            is24Hour
            onChange={handleDateChange(OFF_TIME)}
            mode="time"
            style={styles.date}
          />
        )}
      </View>
    </View>
  );
};

export default GroupField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  input: {
    padding: 14,
    borderRadius: 50,
    fontSize: 14,
  },
  inputContainer: {
    // backgroundColor: "white",
    padding: 0,
    backgroundColor: "#eee",
    borderColor: "white",
    borderRadius: 50,
  },
  dateSelect: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    height: 50,
  },
  dateSelectSwitch: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dateSelectTitle: {
    marginRight: 10,
    fontWeight: "500",
  },
  date: {
    flexBasis: "50%",
  },
});

const pickerStyle = StyleSheet.create({
  inputIOS: {
    padding: 14,
    backgroundColor: "#eee",
    borderColor: "white",
    borderRadius: 50,
    marginBottom: 20,
  },

  inputIOSContainer: {
    paddingHorizontal: 10,
  },
});
