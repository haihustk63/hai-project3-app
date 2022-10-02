// import các thư viện và module
import { useCallback, useContext, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import RuleCard from "src/components/RuleCard";
import { DeviceContext } from "src/context/DeviceContext";
import { RuleContext } from "src/context/RuleContext";
import DeviceCard from "../../components/DeviceCard";
import GroupButton from "./GroupButton";
import useUpdateDeviceStatus from "./hooks";

const Home = () => {
  // Lấy các giá trị DeviceContext cung cấp
  const { devices, getAllDevices, setDevices } = useContext(
    DeviceContext
  ) as any;

  // Lấy các giá trị RuleContext cung cấp
  const { rules, handleDeleteRule, handleGetRules } = useContext(
    RuleContext
  ) as any;

  // State refreshing để người dùng có thể kéo load lại trang
  const [refreshing, setRefreshing] = useState(false);

  // Sử dụng hàm onUpdateDevice từ custom hook useUpdateDeviceStatus
  const { onUpdateDevice } = useUpdateDeviceStatus();

  // Mỗi khi device thay đổi thì hàm này sẽ được tạo lại.
  // Hàm nhận vào deviceId và value mới, dựa vào đó thay đổi giá trị trong state devices
  const handleSetNewDevices = useCallback(
    (deviceId: string, value?: number) => {
      const newDevices = [...devices];
      let deviceIndex = newDevices.findIndex((d: any) => d._id === deviceId);

      newDevices[deviceIndex].value = value
        ? value
        : newDevices[deviceIndex].value === 1
        ? 0
        : 1;

      setDevices(newDevices);
    },
    [devices]
  );

  // Hàm xử lý khi người dùng kéo từ trên xuống (reload trang)
  // Nó sẽ lấy lại danh sách thiết bị và danh sách luật
  const handleOnRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await getAllDevices();
    await handleGetRules();
    setRefreshing(false);
  };

  // Nếu có nhiều hơn 4 thiết bị thì chỉ chọn 4 thiết bị đầu hiển thị ở màn home
  const selectItems = devices?.length > 4 ? devices?.slice(0, 4) : devices;

  // Tạo ra cardItems là dữ liệu truyền cho các AppCard
  const cardItems = selectItems?.map((d: any) => ({
    title: d?.name,
    value: d?.interact ? (d?.value ? "ON" : "OFF") : d?.value,
    buttonColor: d?.value === 1 ? "primary" : "warning",
    hasButton: d?.interact,
    deviceId: d._id,
  }));

  // Tương tự, chỉ hiển thị tối đa 4 luật tự động
  const ruleItems = rules?.length > 4 ? rules?.slice(0, 4) : rules;

  // Hàm yêu cầu thay đổi trạng thái thiết bị
  const handleChangeStatus = (deviceId: any) => async () => {
    await onUpdateDevice(deviceId);
    handleSetNewDevices(deviceId);
  };

  // Mỗi RuleCard sẽ có một nút xóa, hàm này sẽ thực hiện xóa luật
  const handlePressButtonRuleCard = (ruleId: string) => async () => {
    await handleDeleteRule(ruleId);
  };

  return (
    // <LinearGradient colors={["#a1c4fd", "#c2e9fb"]}>
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
      }
    >
      <View style={styles.home}>
        {devices?.length === 0 && <Text>You have no devices!</Text>}
        <View style={styles.container}>
          {/* Map cardItems sinh ra các DeviceCard */}
          {cardItems?.map((item: any) => (
            <DeviceCard
              key={item.deviceId}
              title={item.title}
              value={item.value}
              hasButton={item.hasButton}
              buttonColor={item.buttonColor}
              onPress={handleChangeStatus(item.deviceId)}
            />
          ))}
        </View>
        <GroupButton />
        {ruleItems?.length === 0 && <Text>You have no time rules!</Text>}
        <View style={{ ...styles.container, ...styles.container2 }}>
          {/* Map ruleItems sinh ra các RuleCard */}
          {ruleItems?.map((rule: any) => (
            <RuleCard
              rule={rule}
              key={rule._id}
              onPressButton={handlePressButtonRuleCard(rule._id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

// Custom style cho Home
const styles = StyleSheet.create({
  home: {
    marginVertical: 10,
    padding: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },

  container2: {
    flexDirection: "column",
    borderColor: "red",
  },

  ruleCard: {
    width: "100%",
  },
});
