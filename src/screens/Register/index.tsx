import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "src/components/AppButton";
import { SCREEN_NAME } from "src/constant";
import { registerSchema, REGISTER_FIELD } from "../../schemas";
import GroupField from "./GroupField";
import useRegister from "./hooks";

const { EMAIL, PASSWORD, RE_PASSWORD } = REGISTER_FIELD;

const initialValues = {
  [EMAIL]: "",
  [PASSWORD]: "",
  [RE_PASSWORD]: "",
};

const Register = () => {
  const { loading, onRegister } = useRegister();
  const navigate = useNavigation();

  const handleSuccess = () => {
    navigate.navigate(SCREEN_NAME.LOGIN as any);
  };

  const handleFailed = () => {};

  const handleSubmitForm = async (data: any) => {
    const { email, password } = data;
    await onRegister({
      data: { email, password },
      onSuccess: handleSuccess,
      onFailed: handleFailed,
    });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -500}
        enabled
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validationSchema={registerSchema}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <View style={styles.container}>
              <Text style={styles.textLogin}>REGISTER</Text>
              <GroupField />
              <AppButton
                title="Register"
                onPress={handleSubmit}
                style={styles.button}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  textLogin: {
    fontSize: 32,
    textAlign: "center",
  },
  button: {
    marginHorizontal: 14,
  },
});
