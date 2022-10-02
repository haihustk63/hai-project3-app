// import từ các thư viện và module ngoài
import { useContext, useState } from "react";
import { showMessage } from "react-native-flash-message";

import { DeviceContext } from "src/context/DeviceContext";
import deviceService from "src/services/device";

// custom hook chứa hàm update config cho cảm biến độ ẩm
export const useUpdateMoistureConfig = () => {
  const [loading, setLoading] = useState(false);
  const { getAllDevices } = useContext(DeviceContext) as any;

  //Hàm này nhận tham số là deviceId: id của cảm biến và data: config mới
  const handleUpdateMoistureConfig = async (deviceId: string, data?: any) => {
    try {
      setLoading(true);
      await deviceService.updateDevice(deviceId, data);
      // update thành công thì lấy lại dữ liệu và hiển thị message thành công
      await getAllDevices();
      showMessage({ message: "Update successfully", type: "success" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    onUpdateMoistureConfig: handleUpdateMoistureConfig,
    loading,
  };
};

// custom hook chứa hàm update giá trị của máy bơm
export const useUpdateWaterPump = () => {
  const [loading, setLoading] = useState(false);

  // Hàm này nhận tham số là deviceId: id của máy bơm đó
  const handleUpdateWaterPump = async (deviceId: string) => {
    try {
      setLoading(true);
      await deviceService.updateDevice(deviceId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    onUpdateWaterPump: handleUpdateWaterPump,
    loading
  };
};
