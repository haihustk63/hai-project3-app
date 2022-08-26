import { Divider } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../AppButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

const AppCard = ({
  title,
  value,
  buttonColor,
  hasButton,
  onPress,
  typeButton,
  style,
}: {
  title: string;
  value: number | string;
  buttonColor?: any;
  hasButton?: boolean;
  onPress?: any;
  typeButton?: any;
  style?: any;
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#EECDA3", "#EF629F"]}
        style={styles.subContainer}
      >
        <View style={styles.leftContainer}>
          <Icon name="lightbulb-o" size={28} color="#fff" />
          <Text style={styles.leftText}>{title}</Text>
        </View>
        {/* <Divider style={styles.divider} /> */}
        {hasButton ? (
          <AppButton
            title={String(value)}
            onPress={onPress}
            color={buttonColor}
            type={typeButton}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        ) : (
          <Text style={styles.rightText}>{value}</Text>
        )}
      </LinearGradient>
    </View>
  );
};

export default AppCard;

const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
    paddingVertical: 5,
  },
  subContainer: {
    borderRadius: 5,
    // backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  leftText: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
    color: "#fff",
  },
  rightText: {
    fontSize: 32,
    textAlign: "center",
  },
  button: {
    padding: 5,
    width: 80,
    backgroundColor: "#fff",
  },
  buttonTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});
