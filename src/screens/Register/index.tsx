// import các thư viện và các module bên ngoài
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
import { registerSchema, REGISTER_FIELD } from "../../schemas";
import GroupField from "./GroupField";
import useRegister from "./hooks";

// Lấy ra tên các trường cần thiết khi đăng ký tài khoản
const { EMAIL, PASSWORD, RE_PASSWORD } = REGISTER_FIELD;

// Giá trị khởi tạo của form
const initialValues = {
  [EMAIL]: "",
  [PASSWORD]: "",
  [RE_PASSWORD]: "",
};

const Register = () => {
  const { onRegister } = useRegister();
  const navigate = useNavigation();

  // Hàm thực hiện khi đăng ký thành công là quay về trang login
  const handleSuccess = () => {
    navigate.navigate(SCREEN_NAME.LOGIN as any);
  };

  const handleFailed = (error?: string) => {
    if (error) {
      showMessage({ message: error, type: "danger" });
    }
  };

  // Hàm thực hiện khi submit form
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
          {({ handleSubmit }) => (
            <View style={styles.container}>
              <Text style={styles.textLogin}>REGISTER</Text>
              <GroupField />
              <AppButton
                title="Register"
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

export default Register;

// Custom style cho màn Register
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
