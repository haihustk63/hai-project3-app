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
import { showMessage } from "react-native-flash-message";
import AppButton from "src/components/AppButton";
import { SCREEN_NAME } from "src/constant";
import { UserInfo } from "src/store";
import { loginSchema, LOGIN_FIELD } from "../../schemas";
import GroupField from "./GroupField";
import useLogin from "./hooks";

const { EMAIL, PASSWORD } = LOGIN_FIELD;

const initialValues = {
  [EMAIL]: "",
  [PASSWORD]: "",
};

const Login = () => {
  const navigation = useNavigation();

  const { onLogin } = useLogin();

  const handleLoginSuccess = async (data: UserInfo) => {};

  const handleLoginFailed = (message: string) => {
    showMessage({ message, type: "danger" });
  };

  const handleSubmitForm = async (data: any) => {
    await onLogin({
      data,
      onSuccess: handleLoginSuccess,
      onFailed: handleLoginFailed,
    });
  };

  const handleRegister = () => {
    navigation.navigate(SCREEN_NAME.REGISTER as any);
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
          validationSchema={loginSchema}
        >
          {({ handleSubmit }) => (
            <View style={styles.container}>
              <Text style={styles.textLogin}>LOGIN</Text>
              <GroupField />
              <AppButton
                title="Login"
                onPress={handleSubmit}
                style={styles.button}
                buttonStyle={styles.button}
              />
              <AppButton
                title="Register now"
                onPress={handleRegister}
                style={{ ...styles.buttonRegister }}
                buttonStyle={styles.button}
                type="clear"
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;

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
  buttonRegister: {
    marginTop: 14,
  },
});
