// Import từ các thư viện
import { Divider } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Import AppButton
import AppButton from "../AppButton";

/* Các props cần truyền cho RuleCard
rule: Thông tin của rule
onPressButton: Mỗi rule sẽ có nút xóa, hàm này thực hiện khi bấm nút
condition: Rule đó có là condition rule (luật phụ thuộc) hay không
*/
const RuleCard = ({
  rule,
  onPressButton,
  condition = false,
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
        // Nếu rule là condition rule sẽ hiển thị thiết bị điều kiện và thiết bị phụ thuộc //
        <Text style={styles.info}>
          {rule?.preDeviceId?.name} {rule?.preValue === 1 ? "ON" : "OFF"}
          <View style={styles.iconWrap}>
            <Icon name="arrow-right" style={styles.iconWrap.icon} />
          </View>
          {rule?.afterDeviceId?.name} {rule?.afterValue === 1 ? "ON" : "OFF"}
        </Text>
      ) : (
        // Nếu rule là time rule thì hiển thị thời gian rule sẽ kích hoạt
        <Text style={styles.info}>
          Turn {rule.value === 0 ? "off" : "on"} {rule.deviceId.name} on {hour}:
          {Number(minute < 10) ? `0${minute}` : minute}
        </Text>
      )}
    </View>
  );
};

// Export RuleCard để nơi khác có thể sử dụng
export default RuleCard;

// StyleSheet Object: Custom thêm cho RuleCard
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
