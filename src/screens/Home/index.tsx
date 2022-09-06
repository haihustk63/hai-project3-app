import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import RuleCard from "src/components/RuleCard";
import { DeviceContext } from "src/context/DeviceContect";
import { RuleContext } from "src/context/RuleContext";
import Card from "../../components/Card";
import GroupButton from "./GroupButton";
import useUpdateDeviceStatus from "./hooks";


const Home = () => {
  const { devices, getAllDevices, setDevices } =
    useContext(DeviceContext);

  const { rules, handleDeleteRule, handleGetRules } = useContext(RuleContext);
  const [refreshing, setRefreshing] = useState(false);

  const { onUpdateDevice } = useUpdateDeviceStatus();

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

  useEffect(() => {
    if (devices?.length) {
      setRefreshing(false);
    }
  }, [devices]);

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await getAllDevices();
    await handleGetRules();
  };

  const selectItems = devices?.length > 4 ? devices?.slice(0, 4) : devices;

  const cardItems = selectItems?.map((d: any) => ({
    title: d?.name,
    value: d?.interact ? (d?.value ? "ON" : "OFF") : d?.value,
    buttonColor: d?.value === 1 ? "primary" : "warning",
    hasButton: d?.interact,
    deviceId: d._id,
  }));

  const ruleItems = rules?.length > 4 ? rules?.slice(0, 4) : rules;

  const handleChangeStatus = (deviceId: any) => async () => {
    await onUpdateDevice(deviceId);
    // await getAllDevices();
    handleSetNewDevices(deviceId);
  };

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
        <View style={styles.container}>
          {cardItems?.map((item: any) => (
            <Card
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
        <View style={{ ...styles.container, ...styles.container2 }}>
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

    // </LinearGradient>
  );
};

export default Home;

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
