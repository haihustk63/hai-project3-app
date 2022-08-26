import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";

const AppButton = ({
  title,
  onPress,
  color,
  style,
  disabled,
  type,
  titleStyle,
  buttonStyle,
}: {
  title: string;
  onPress: any;
  color?: string;
  style?: any;
  titleStyle?: any;
  buttonStyle?: any;
  disabled?: boolean;
  type?: "outline" | "clear" | "solid" | undefined;
}) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      // containerStyle={{ ...styles.button, ...style }}
      color={color}
      disabled={disabled}
      type={type}
      titleStyle={titleStyle}
      buttonStyle={{ ...styles.button, ...buttonStyle }}
    />
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
});
