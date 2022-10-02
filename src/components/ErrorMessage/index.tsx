// Import StyleSheet, Text của react-native
import { StyleSheet, Text } from "react-native";

/* Props truyền cho ErrorMessage
touched: touched state mà formik quản lý
errors: errors state mà formik form quản lý
field: field đang xét
style: custom style cho ErrorMessage
*/
const ErrorMessage = ({
  touched,
  errors,
  field,
  style
}: {
  touched: any;
  errors: any;
  field: string;
  style?: any;
}) => {
  return errors[field] && touched[field] ? (
    <Text style={{...styles.error, ...style}}>{errors[field]}</Text>
  ) : null;
};

// StyleSheet Object: Custom style cho ErrorMessage
const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: "#ff0000",
    marginHorizontal: 14,
    marginBottom: 30,
  },
});

export default ErrorMessage;
