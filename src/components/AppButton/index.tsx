// Import button cơ bản từ @rneui/themd và StyleSheet từ react-native
import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";

/*Môi AppButton sẽ nhận vào một số props nư title (tiêu đề), color (màu sắc), 
disabled (cho phép hoạt động), onPress (hàm thực hiện khi nhấn button),
titleStyle (style áp dụng cho title của button), buttonStyle (style áp dụng cho button), 
type (loại button: outline, clear, solid) */

const AppButton = ({
  title,
  onPress,
  color,
  disabled,
  type,
  titleStyle,
  buttonStyle,
}: {
  title: string;
  onPress: any;
  color?: string;
  titleStyle?: any;
  buttonStyle?: any;
  disabled?: boolean;
  type?: "outline" | "clear" | "solid" | undefined;
}) => {
  // Truyền props cho Button
  return (
    <Button
      title={title}
      onPress={onPress}
      color={color}
      disabled={disabled}
      type={type}
      titleStyle={titleStyle}
      buttonStyle={{ ...styles.button, ...buttonStyle }}
    />
  );
};

// Export AppButton để sử dụng ở nơi khác
export default AppButton;

// Tạo StyleSheet Object để custom thêm cho AppButton
const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
});
