// import các thư viện và module ngoài
import { useNavigation } from "@react-navigation/native";
import { useContext, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import deviceApi from "src/api/device";

import AppButton from "src/components/AppButton";
import AppCard from "src/components/DeviceCard";
import { SCREEN_NAME } from "src/constant";
import { AuthContext } from "src/context/AuthContext";
import { DeviceContext } from "src/context/DeviceContext";
import useUpdateDeviceStatus from "../Home/hooks";

// Component hiển thị các thiết bị trong cùng một phòng
// Nhận vào data là danh sách các phòng và roomNumber là số phòng
const DeviceByRoom = ({
  data,
  roomNumber,
}: {
  roomNumber: number;
  data: any;
}) => {
  // Sử dụng các giá trị trong AuthContext và DeviceContext
  const { isAdmin } = useContext(AuthContext) as any;
  const { getAllDevices, handleTurnOnAllDevices } = useContext(
    DeviceContext
  ) as any;

  const { onUpdateDevice } = useUpdateDeviceStatus();

  // State turnOn để báo hiệu bật/tắt các thiết bị ánh sáng trong phòng
  const [turnOn, setTurnOn] = useState(false);

  // Hàm này sẽ giúp xóa một thiết bị trong phòng, sau đó lấy lại danh sách mới
  const handleDeleteDevice = (deviceId: string) => async () => {
    await deviceApi.deleteDevice(deviceId);
    await getAllDevices();
  };

  // cardItems chứa các thông tin cần thiết để truyền cho AppCard
  const cardItems = isAdmin
    ? data?.map((d: any) => ({
        title: d?.name,
        hasButton: true,
        deviceId: d._id,
        value: "Delete",
        onPress: handleDeleteDevice(d._id),
        info: d.personId?.email,
      }))
    : data?.map((d: any) => ({
        title: d?.name,
        value: d?.interact ? (d?.value ? "ON" : "OFF") : d?.value,
        buttonColor: d?.value === 1 ? "primary" : "warning",
        hasButton: d?.interact,
        deviceId: d._id,
      }));

  // Hàm này yêu cầu thay đổi trạng thái của thiết bị dựa vào id
  const handleChangeStatus = (deviceId: any) => async () => {
    await onUpdateDevice(deviceId);
    await getAllDevices();
  };

  // Hàm này yêu cầu bật/tắt tất cả các thiết bị ánh sáng trong phòng
  const handleTurnOnAllDevicesByRoom = (room: number) => async () => {
    if (turnOn) {
      await handleTurnOnAllDevices(room, 0);
      setTurnOn(false);
    } else {
      await handleTurnOnAllDevices(room, 1);
      setTurnOn(true);
    }
  };

  return (
    <View style={{ ...styles.deviceByRoom, ...styles.shadow }}>
      <View style={styles.roomTitle}>
        <Text style={styles.deviceByRoomText}>Room {roomNumber}</Text>
        {isAdmin ? null : (
          <AppButton
            title={turnOn ? "Turn off all lights" : "Turn on all lights"}
            onPress={handleTurnOnAllDevicesByRoom(roomNumber)}
            buttonStyle={styles.turnOnAllBtn}
            titleStyle={styles.turnOnAllBtnTitle}
            type="outline"
          />
        )}
      </View>
      {/* cardItems được map để tạo thành các AppCard */}
      {cardItems?.map((item: any) => (
        <View key={item.deviceId}>
          <AppCard
            key={item.deviceId}
            title={item.title}
            value={item.value}
            hasButton={item.hasButton}
            buttonColor={item.buttonColor}
            onPress={item.onPress || handleChangeStatus(item.deviceId)}
            info={item.info}
          />
        </View>
      ))}
    </View>
  );
};

// Component hiển thị các phòng theo tầng
// Nhận vào data: Danh sách các phòng trong tầng và floorNumber: Sô tầng
const HomeByFloor = ({
  data,
  floorNumber,
}: {
  data: any;
  floorNumber: number;
}) => {
  // Ứng với mỗi phòng sẽ render các thiết bị trong phòng đó
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

// Màn Devices
const Devices = () => {
  // Sử dụng floorMap từ DeviceContext, chứa thông tin các tầng, các phòng và các thiết bị trong từng phòng
  const { floorMap } = useContext(DeviceContext) as any;
  const navigate = useNavigation();

  // Với mỗi tầng sẽ hiển thị ra các phòng trong tầng đó
  const renderFloor = useMemo(() => {
    const renderList: any[] = [];
    floorMap?.forEach((value: any, key: number) => {
      renderList.push(<HomeByFloor key={key} data={value} floorNumber={key} />);
    });
    return renderList;
  }, [floorMap]);

  // Nếu người dùng bấm nút thêm thiết bị sẽ chuyển sang màn thêm thiết bị
  const handleGoToAddNewDevice = () => {
    navigate.navigate(SCREEN_NAME.ADD_NEW_DEVICE as any);
  };

  return (
    <ScrollView style={styles.wrap}>
      {renderFloor}
      <AppButton
        title="Add New Device"
        onPress={handleGoToAddNewDevice}
        buttonStyle={styles.buttonAddNew}
      />
    </ScrollView>
  );
};

export default Devices;

// Custom style cho màn Devices
const styles = StyleSheet.create({
  wrap: {
    marginBottom: 20,
  },
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
    fontWeight: "500",
  },
  homeByFloorTextWrap: {
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
  roomTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  turnOnAllBtn: {
    padding: 3,
    width: 150,
  },
  turnOnAllBtnTitle: {
    fontSize: 12,
  },
  buttonAddNew: {
    marginHorizontal: 10,
  },
});
