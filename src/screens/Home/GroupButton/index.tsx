import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import AppButton from "../../../components/AppButton";
import { SCREEN_NAME } from "../../../constant";

const GroupButton = () => {
  const navigate = useNavigation();

  const handleOnPressAddRule = () => {
    navigate.navigate(SCREEN_NAME.AUTOMATION_RULES as any);
  };

  const handleOnPressAddDevice = () => {
    navigate.navigate(SCREEN_NAME.ADD_NEW_DEVICE as any);
  };
  return (
    <View style={styles.container}>
      {/* <AppButton
        title="Add New Devices"
        onPress={handleOnPressAddDevice}
        color="primary"
        style={styles.button}
      /> */}

      <AppButton
        title="Add Automation Rules"
        onPress={handleOnPressAddRule}
        color="secondary"
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default GroupButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 5,
  },
});
