import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import AppButton from "src/components/AppButton";
import { AuthContext } from "src/context/AuthContext";
import useLogout from "./hooks/useLogout";

const Profile = () => {
  const { onLogout } = useLogout();
  const { info = {} } = useContext(AuthContext) as any;

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#EECDA3", "#EF629F"]}
        style={styles.profileIcon}
      >
        <Icon name="user-o" size={60} color="white" />
        <Text style={styles.profileIcon.text as any}>{info?.email || ""}</Text>
      </LinearGradient>
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
    height: "100%",
  },
  profileIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    text: {
      color: "white",
      fontWeight: "500",
      fontSize: 16
    },
  },
  button: {
    marginTop: 20,
    marginHorizontal: 14,
  },
});

export default Profile;
