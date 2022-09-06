import { useContext, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AppCard from "src/components/Card";
import { DeviceContext } from "src/context/DeviceContect";
import useUpdateDeviceStatus from "../Home/hooks";

const DeviceByRoom = ({
  data,
  roomNumber,
}: {
  roomNumber: number;
  data: any;
}) => {
  const { getAllDevices } = useContext(DeviceContext);
  const { onUpdateDevice } = useUpdateDeviceStatus();

  const cardItems = data?.map((d: any) => ({
    title: d?.name,
    value: d?.interact ? (d?.value ? "ON" : "OFF") : d?.value,
    buttonColor: d?.value === 1 ? "primary" : "warning",
    hasButton: d?.interact,
    deviceId: d._id,
  }));

  const handleChangeStatus = (deviceId: any) => async () => {
    await onUpdateDevice(deviceId);
    await getAllDevices();
  };

  return (
    <View style={{ ...styles.deviceByRoom, ...styles.shadow }}>
      <Text style={styles.deviceByRoomText}>Room {roomNumber}</Text>
      {cardItems?.map((item: any) => (
        <View key={item.deviceId}>
          <AppCard
            key={item.deviceId}
            title={item.title}
            value={item.value}
            hasButton={item.hasButton}
            buttonColor={item.buttonColor}
            onPress={handleChangeStatus(item.deviceId)}
          />
        </View>
      ))}
    </View>
  );
};

const HomeByFloor = ({
  data,
  floorNumber,
}: {
  data: any;
  floorNumber: number;
}) => {
  const renderRoom = useMemo(() => {
    const renderList: any[] = [];
    data?.forEach((value: any, key: number) => {
      renderList.push(<DeviceByRoom key={key} roomNumber={key} data={value} />);
    });
    return renderList;
  }, [data]);

  return (
    <View style={styles.homeByFloor}>
      <View style={{ ...styles.homeByFloorTextWrap, ...styles.shadow }}>
        <Text style={styles.homeByFloorText}>Floor {floorNumber}</Text>
      </View>
      <View>{renderRoom}</View>
    </View>
  );
};

const Devices = () => {
  const { floorMap } = useContext(DeviceContext);

  const renderFloor = useMemo(() => {
    const renderList: any[] = [];
    floorMap?.forEach((value: any, key: number) => {
      renderList.push(<HomeByFloor key={key} data={value} floorNumber={key} />);
    });
    return renderList;
  }, [floorMap]);

  return <ScrollView>{renderFloor}</ScrollView>;
};

export default Devices;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  homeByFloor: {
    margin: 10,
    marginBottom: 30,
  },
  homeByFloorText: {
    fontSize: 24,
    fontWeight: "500"
  },
  homeByFloorTextWrap: {
    // backgroundColor: "#fff",
    // borderRadius: 5,
    // paddingHorizontal: 10,
    marginBottom: 10,
  },
  deviceByRoom: {
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  deviceByRoomText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
