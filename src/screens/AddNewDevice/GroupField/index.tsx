import { useContext } from "react";
import { Input } from "@rneui/themed";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { ADD_NEW_DEVICE_FIELD } from "../../../schemas";
import ErrorMessage from "src/components/ErrorMessage";
import { DeviceContext } from "src/context/DeviceContext";
import useGetUsers from "../hooks/useGetUsers";

const { NAME, TYPE, PERSON, PORT, FLOOR, ROOM } = ADD_NEW_DEVICE_FIELD;

const GroupField = () => {
  // useFormikContext cung cấp các state và hàm quản lý form
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext();

  // Lấy ra danh sách users bằng custom hook useGetUsers
  const { users = [] } = useGetUsers();

  // Lấy ra danh sách loại thiết bị từ DeviceContext
  const { deviceTypes = [], loading } = useContext(DeviceContext) as any;

  if (loading) return null;

  // Form sẽ gồm các trường name, type, person, port, floor, room
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

      <Input
        value={(values as any)[PORT]}
        placeholder="Enter device port"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(PORT)}
        onBlur={handleBlur(PORT)}
      />
      <ErrorMessage errors={errors} touched={touched} field={PORT} />

      <RNPickerSelect
        onValueChange={handleChange(PERSON)}
        items={users}
        placeholder={{ label: "Select user", value: "" }}
        value={(values as any)[PERSON] || ""}
        style={pickerStyle}
      />
      <ErrorMessage
        errors={errors}
        touched={touched}
        field={PERSON}
        style={{ marginTop: 24 }}
      />

      <Input
        value={(values as any)[FLOOR]}
        placeholder="Enter device floor"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(FLOOR)}
        onBlur={handleBlur(FLOOR)}
      />
      <ErrorMessage errors={errors} touched={touched} field={FLOOR} />

      <Input
        value={(values as any)[ROOM]}
        placeholder="Enter device room"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(ROOM)}
        onBlur={handleBlur(ROOM)}
      />
      <ErrorMessage errors={errors} touched={touched} field={ROOM} />
    </View>
  );
};

export default GroupField;

// Custom style cho GroupField
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
    marginBottom: 20,
  },
});
