import { Divider } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../AppButton";

const RuleCard = ({
  rule,
  onPressButton,
  ...props
}: {
  rule: any;
  onPressButton: any;
}) => {
  const [_, minute, hour] = rule.time.split(" ");
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.nameText}>{rule.name}</Text>
        <AppButton
          title="Delete"
          onPress={onPressButton}
          titleStyle={styles.titleButton}
          buttonStyle={styles.buttonStyle}
        />
      </View>
      <Divider />
      <Text style={styles.info}>
        Turn {rule.value === 0 ? "off" : "on"} {rule.deviceId.name} on {hour}:
        {Number(minute < 10) ? `0${minute}` : minute}
      </Text>
    </View>
  );
};

export default RuleCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexGrow: 1,
    border: 1,
    width: "100%",
  },
  titleButton: {
    fontSize: 12,
  },
  buttonStyle: {
    padding: 5,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000bb",
  },
  info: {
    marginTop: 10,
  },
});
