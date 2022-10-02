import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import AppButton from "../../../components/AppButton";
import { SCREEN_NAME } from "../../../constant";

const GroupButton = () => {
  // Sử dụng hook useNavigation từ React Navigation
  const navigate = useNavigation();

  // Nếu người dùng click nút xem danh sách luật, chuyển sang màn danh sách luật
  const handleOnViewRules = () => {
    navigate.navigate(SCREEN_NAME.RULE as any);
  };

  // Nếu người dùng click nút xem danh sách thiết bị, chuyển sang màn danh sách thiết bị
  const handleViewDevices = () => {
    navigate.navigate(SCREEN_NAME.DEVICES as any);
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="View Devices"
        onPress={handleViewDevices}
        color="primary"
        buttonStyle={styles.button}
      />

      <AppButton
        title="View Rules"
        onPress={handleOnViewRules}
        color="secondary"
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default GroupButton;

// Custom style cho GroupButton
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  button: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
