import { Divider } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AppButton from "../AppButton";

const RuleCard = ({
  rule,
  onPressButton,
  condition = false,
  ...props
}: {
  rule: any;
  onPressButton: any;
  condition?: boolean;
}) => {
  const [_, minute, hour] = condition ? [] : rule?.time?.split(" ");
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
      <Divider style={styles.divider} />
      {condition ? (
        <Text style={styles.info}>
          {rule?.preDeviceId?.name} {rule?.preValue === 1 ? "ON" : "OFF"}
          <View style={styles.iconWrap}>
            <Icon name="arrow-right" style={styles.iconWrap.icon} />
          </View>
          {rule?.afterDeviceId?.name} {rule?.afterValue === 1 ? "ON" : "OFF"}
        </Text>
      ) : (
        <Text style={styles.info}>
          Turn {rule.value === 0 ? "off" : "on"} {rule.deviceId.name} on {hour}:
          {Number(minute < 10) ? `0${minute}` : minute}
        </Text>
      )}
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
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  },
  nameText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000bb",
  },
  info: {
    marginTop: 10,
  },
  divider: {
    marginTop: 10,
  },
  iconWrap: {
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    icon: {
      fontSize: 16,
    },
  },
});
