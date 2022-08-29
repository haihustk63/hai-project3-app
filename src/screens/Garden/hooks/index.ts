import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import deviceService from "src/services/device";

export const useUpdateMoistureConfig = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateMoistureConfig = async (deviceId: string, data?: any) => {
    try {
      setLoading(true);
      await deviceService.updateDevice(deviceId, data);
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

export const useUpdateWaterPump = () => {
  const [loading, setLoading] = useState(false);

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
  };
};
