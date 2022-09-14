import { StyleSheet, View } from "react-native";

import AppButton from "src/components/AppButton";
import useLogout from "./hooks/useLogout";

const Profile = () => {
  const { onLogout } = useLogout();
  const handleLogout = async () => {
    await onLogout();
  };
  return (
    <View style={styles.container}>
      <AppButton
        title="Logout"
        onPress={handleLogout}
        style={{ ...styles.button }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    height: "100%"
  },
  button: {
    marginTop: 20,
    marginHorizontal: 14,
  },
});

export default Profile;
