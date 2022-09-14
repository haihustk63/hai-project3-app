import { useContext } from "react";
import { Input } from "@rneui/themed";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { ADD_NEW_DEVICE_FIELD } from "../../../schemas";
import ErrorMessage from "src/components/ErrorMessage";
import { DeviceContext } from "src/context/DeviceContect";

const { NAME, TYPE } = ADD_NEW_DEVICE_FIELD;

const GroupField = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext();

  const { deviceTypes = [], loading } = useContext(DeviceContext) as any;

  if(loading) return null;

  return (
    <View style={styles.container}>
      <Input
        value={(values as any)[NAME]}
        placeholder="Enter device name"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(NAME)}
        onBlur={handleBlur(NAME)}
      />
      <ErrorMessage errors={errors} touched={touched} field={NAME} />

      <RNPickerSelect
        onValueChange={handleChange(TYPE)}
        items={deviceTypes}
        placeholder={{ label: "Select device type", value: "" }}
        value={(values as any)[TYPE] || ""}
        style={pickerStyle}
      />
      <ErrorMessage
        errors={errors}
        touched={touched}
        field={TYPE}
        style={{ marginTop: 24 }}
      />
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
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 50,
  },
});

const pickerStyle = StyleSheet.create({
  inputIOS: {
    padding: 14,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 50,
  },

  inputIOSContainer: {
    paddingHorizontal: 10,
  },
});
