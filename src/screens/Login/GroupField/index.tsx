
// import từ các thư viện và các module ngoài
import { Input } from "@rneui/themed";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

import ErrorMessage from "src/components/ErrorMessage";
import { LOGIN_FIELD } from "../../../schemas";

const { EMAIL, PASSWORD } = LOGIN_FIELD;

const GroupField = () => {
  // Sử dụng các state và hàm quản lý form do formik cung cấp
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext();

    // Input field gồm 2 trường là email và password
  return (
    <View style={styles.container}>
      <Input
        value={(values as any)[EMAIL]}
        placeholder="Enter email"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(EMAIL)}
        onBlur={handleBlur(EMAIL)}
      />
      <ErrorMessage errors={errors} touched={touched} field={EMAIL} />

      <Input
        value={(values as any)[PASSWORD]}
        placeholder="Enter password"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(PASSWORD)}
        onBlur={handleBlur(PASSWORD)}
        secureTextEntry
      />
      <ErrorMessage errors={errors} touched={touched} field={PASSWORD} />
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
