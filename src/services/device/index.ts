import deviceApi from "src/api/device";

class DeviceService {
  getAllDevices = async ({ personId }: { personId: string }) => {
    return await deviceApi.getAllDevices({ personId });
  };

  getAllDeviceTypes = async () => {
    return await deviceApi.getAllDeviceType();
  };

  createNewDevice = async (data: any) => {
    return await deviceApi.createDevice(data);
  };

  updateDevice = async (deviceId: string) => {
    return await deviceApi.updateDevice(deviceId);
  };
}

const deviceService = new DeviceService();

export default deviceService;
