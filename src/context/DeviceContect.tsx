import { createContext, useContext, useEffect, useState } from "react";
import deviceService from "src/services/device";
import { AuthContext } from "./AuthContext";

export const DeviceContext = createContext({}) as any;

const DeviceProvider = ({ children }: { children: any }) => {
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [devices, setDevices] = useState([]);
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

      setDevices(data);
      setSelectDataDevice(selectData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
