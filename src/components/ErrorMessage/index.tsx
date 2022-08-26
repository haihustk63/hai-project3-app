import { StyleSheet, Text } from "react-native";

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

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    color: "#ff0000",
    marginHorizontal: 14,
    marginBottom: 30,
  },
});

export default ErrorMessage;
