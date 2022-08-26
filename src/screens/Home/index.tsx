import { useCallback, useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet, View
} from "react-native";
import io from "socket.io-client";
import RuleCard from "src/components/RuleCard";
import { API_URL_EXPORT } from "src/constant";
import { DeviceContext } from "src/context/DeviceContect";
import { RuleContext } from "src/context/RuleContext";
import Card from "../../components/Card";
import GroupButton from "./GroupButton";
import useUpdateDeviceStatus from "./hooks";

const socket = io(API_URL_EXPORT);

const Home = () => {
  const { devices, loading, deviceTypes, getAllDevices, setDevices } =
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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client connected");
    });

    socket.on("DeviceValueChange", (newInfo: any) => {
      const { deviceId, value } = newInfo;
      handleSetNewDevices(deviceId as string, value as number);
    });

    return () => {
      socket.off("connect");
      socket.off("DeviceValueChange");
    };
  }, [handleSetNewDevices]);

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await getAllDevices();
    await handleGetRules();
  };

  if (loading) return null;

  const cardItems =
    devices?.map((d: any) => ({
      title: d?.name,
      value: d?.interact ? (d?.value ? "ON" : "OFF") : d?.value,
      buttonColor: d?.value === 1 ? "primary" : "warning",
      hasButton: d?.interact,
      deviceId: d._id,
    })) || [];

  const handleChangeStatus = (deviceId: any) => async () => {
    await onUpdateDevice(deviceId);
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
          {rules?.map((rule: any) => (
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
    padding: 10
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
