// import từ các thư viện và module ngoài
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

// Thông tin cần là email và password
const { EMAIL, PASSWORD } = LOGIN_FIELD;

// Giá trị khởi tạo cho form
const initialValues = {
  [EMAIL]: "",
  [PASSWORD]: "",
};

const Login = () => {
  // Sử dụng hook useNavigation từ React Navigation
  const navigation = useNavigation();

  // Sử dụng hàm onLogin từ custom hook useLogin
  const { onLogin } = useLogin();

  // Nếu đăng nhập thất bại thì hiển thị message thông báo
  const handleLoginFailed = (message: string) => {
    showMessage({ message, type: "danger" });
  };

  // Hàm xử lý khi submit form: gọi tới onLogin
  const handleSubmitForm = async (data: any) => {
    await onLogin({
      data,
      onFailed: handleLoginFailed,
    });
  };

  // Màn này có nút bấm đăng ký tài khoản mới nếu chưa có tài khoảng
  // Bấm vào sẽ chuyển sang màn Register
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
        {/* Sử dụng loginSchema */}
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
                buttonStyle={styles.button}
              />
              <AppButton
                title="Register now"
                onPress={handleRegister}
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

// Custom style cho màn Login
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
