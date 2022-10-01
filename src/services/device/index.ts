import deviceApi from "src/api/device";

class DeviceService {
  getAllDevices = async ({ personId }: { personId: string }) => {
    return await deviceApi.getAllDevices({ personId });
  };

  getAllDevicesAdmin = async () => {
    return await deviceApi.getAllDevicesAdmin();
  };

  getAllDeviceTypes = async () => {
    return await deviceApi.getAllDeviceType();
  };

  createNewDevice = async (data: any) => {
    return await deviceApi.createDevice(data);
  };

  updateDevice = async (deviceId: string, data?: any) => {
    return await deviceApi.updateDevice(deviceId, data);
  };

  turnOnAllDevicesByRoom = async (room: number, value: number) => {
    return await deviceApi.turnOnAllDeviceByRoom(room, value);
  };

  deleteDevice = async (deviceId: string) => {
    return await deviceApi.deleteDevice(deviceId);
  };
}

const deviceService = new DeviceService();

export default deviceService;
