import { useState } from "react";
import deviceService from "src/services/device";

const useUpdateDeviceStatus = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateDevice = async (deviceId: string) => {
    try {
      await deviceService.updateDevice(deviceId);
    } catch (error) {
      console.log(error);
    }
  };

  return { loading, onUpdateDevice: handleUpdateDevice };
};

export default useUpdateDeviceStatus;