import { Input } from "@rneui/themed";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";
import ErrorMessage from "src/components/ErrorMessage";
import { REGISTER_FIELD } from "../../../schemas";

const { EMAIL, PASSWORD, RE_PASSWORD } = REGISTER_FIELD;

const GroupField = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext();

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

      <Input
        value={(values as any)[RE_PASSWORD]}
        placeholder="Enter password"
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={handleChange(RE_PASSWORD)}
        onBlur={handleBlur(RE_PASSWORD)}
        secureTextEntry
      />
      <ErrorMessage errors={errors} touched={touched} field={RE_PASSWORD} />
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
