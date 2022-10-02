// Import các thư viện
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// import các hằng số, deviceService, AuthContext
import { API_URL_EXPORT } from "src/constant";
import deviceService from "src/services/device";
import { AuthContext } from "./AuthContext";

// Tạo một socket nối tới server
const socket = io(API_URL_EXPORT);

// Tạo một context bằng hàm createContext()
export const DeviceContext = createContext({}) as any;

const DeviceProvider = ({ children }: { children: any }) => {
  /*
  Các state context xử lý:
  deviceTypes: Danh sách loại thiết bị
  devices: Danh sách thiết bị
  floorMap: Danh sách thiết bị theo tầng
  selectDataDevice: Danh sách thiết bị nhưng chỉ giữ lại thông tin tên và id
  loading: Trạng thái loading khi đang lấy dữ liệu
  */
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [floorMap, setFloorMap] = useState();
  const [selectDataDevice, setSelectDataDevice] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy ra info và isAdmin từ AuthContext
  const { info = {}, isAdmin } = useContext(AuthContext) as any;

  // Hàm dưới đây dùng để lấy tất cả các devices
  const getAllDevices = async () => {
    // Nếu người dùng chưa đăng nhập (chưa có id trong biến info) thì không làm gì cả
    if (!info?.id) {
      return;
    }
    try {
      setLoading(true);

      // Nếu là admin đăng nhập thì dùng hàm getAllDevicesAdmin
      // Nếu là người dùng bình thường thì dùng hàm getAllDevices và truyền vào id của người dùng
      const fnGetDevice = isAdmin
        ? deviceService.getAllDevicesAdmin
        : deviceService.getAllDevices;

      const result = await fnGetDevice({ personId: info.id });

      const data = result?.data;

      // Chỉ lấy name và id của các device để lưu vào selectDataDevice
      const selectData = data?.map((device: any) => ({
        label: device.name,
        value: device._id,
      }));

      // Tạo ra một Map object để lưu trữ các thiết bị theo tầng
      let newFloorMap = new Map();
      data?.forEach((device: any) => {
        newFloorMap.set(device.floor, [
          ...(newFloorMap.get(device.floor) || []),
          device,
        ]);
      });

      // Với mỗi tầng trong newFloorMap lại dùng một Map object để lưu thiết bị theo phòng
      newFloorMap.forEach((value, key) => {
        let newValue = new Map();
        value?.map((d: any) => {
          newValue.set(d.room, [...(newValue.get(d.room) || []), d]);
        });
        newFloorMap.set(key, newValue);
      });

      // Lưu các state lại
      setDevices(data);
      setSelectDataDevice(selectData);
      setFloorMap(newFloorMap as any);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Mỗi khi thông tin thiết bị thay đổi sẽ thực hiện lại các hành động trong này
  // Đó là các kết nối socket tới server để nhận các dữ liệu tức thì
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Client connected");
    });

    socket.on("DeviceValueChange", async (newInfo: any) => {
      await getAllDevices();
    });

    socket.on("SensorValue", async (newInfo: any) => {
      const { percent, pumpValue, sensorId, pumpId } = newInfo;
      const newDevices: any[] = [...devices];
      const sensorIndex = devices?.findIndex((d: any) => d._id === sensorId);
      let pumpIndex;
      if (pumpId) {
        pumpIndex = devices?.findIndex((d: any) => d._id === pumpId);
      }
      if (sensorIndex) {
        const sensorData = devices?.[sensorIndex] as any;
        const newSensorData = { ...sensorData };
        newSensorData.value = percent;
        newDevices.splice(sensorIndex, 1, newSensorData);
      }

      if (pumpIndex) {
        const pumpData = devices?.[pumpIndex] as any;
        const newPumpData = { ...pumpData };
        newPumpData.value = pumpValue;
        newDevices.splice(pumpIndex, 1, newPumpData);
      }

      setDevices(newDevices);
    });

    return () => {
      socket.off("connect");
      socket.off("DeviceValueChange");
      socket.off("SensorValue");
    };
  }, [devices]);

  // Khi app mới render lần đầu tiên thì sẽ lấy tất cả danh sách các loại thiết bị
  useEffect(() => {
    const getAllDeviceTypes = async () => {
      try {
        setLoading(true);
        const result = await deviceService.getAllDeviceTypes();

        const data = result?.data;

        setDeviceTypes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllDeviceTypes();
  }, []);

  // Khi thông tin người dùng thay đổi sẽ lấy lại danh sách các thiết bị
  useEffect(() => {
    getAllDevices();
  }, [info, isAdmin]);

  // Hàm này thực hiện thêm mới một thiết bị và lấy lại danh sách thiết bị sau khi thêm
  const addNewDevice = async (data: any) => {
    if (!info?.id) {
      return;
    }

    try {
      await deviceService.createNewDevice(data);
      await getAllDevices();
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý việc bật tất cả thiết bị ánh sáng trong cùng một phòng
  const handleTurnOnAllDevices = async (room: number, value: number) => {
    try {
      await deviceService.turnOnAllDevicesByRoom(room, value);
      await getAllDevices();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        deviceTypes,
        devices,
        loading,
        selectDataDevice,
        addNewDevice,
        getAllDevices,
        setDevices,
        floorMap,
        handleTurnOnAllDevices,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
