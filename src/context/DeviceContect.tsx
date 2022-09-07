import { createContext, useContext, useEffect, useState } from "react";
import { API_URL_EXPORT } from "src/constant";
import deviceService from "src/services/device";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const socket = io(API_URL_EXPORT);

export const DeviceContext = createContext({}) as any;

const DeviceProvider = ({ children }: { children: any }) => {
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [floorMap, setFloorMap] = useState();
  const [selectDataDevice, setSelectDataDevice] = useState([]);
  const { info } = useContext(AuthContext) as any;
  const [loading, setLoading] = useState(false);

  const getAllDevices = async () => {
    if (!info?.id) {
      return;
    }
    try {
      setLoading(true);
      const result = await deviceService.getAllDevices({ personId: info.id });

      const data = result?.data;

      const selectData = data?.map((device: any) => ({
        label: device.name,
        value: device._id,
      }));

      let newFloorMap = new Map();
      data?.forEach((device: any) => {
        newFloorMap.set(device.floor, [
          ...(newFloorMap.get(device.floor) || []),
          device,
        ]);
      });

      newFloorMap.forEach((value, key) => {
        let newValue = new Map();
        value?.map((d: any) => {
          newValue.set(d.room, [...(newValue.get(d.room) || []), d]);
        });
        newFloorMap.set(key, newValue);
      });

      setDevices(data);
      setSelectDataDevice(selectData);
      setFloorMap(newFloorMap as any);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getAllDevices();
  }, [info]);

  const addNewDevice = async (data: any) => {
    if (!info?.id) {
      return;
    }

    try {
      const sendData = { ...data, personId: info.id };
      await deviceService.createNewDevice(sendData);
      await getAllDevices();
    } catch (error) {
      console.log(error);
    }
  };

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
        handleTurnOnAllDevices
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
