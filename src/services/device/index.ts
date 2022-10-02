// import deviceApi từ thư mục api/device
import deviceApi from "src/api/device";

// Định nghĩa lớp DeviceService chứa các hàm gọi đến userApi
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

  turnOnAllDevicesByRoom = async (room: number, value: number) => {
    return await deviceApi.turnOnAllDeviceByRoom(room, value);
  };

  deleteDevice = async (deviceId: string) => {
    return await deviceApi.deleteDevice(deviceId);
  };

  updateDevice = async (deviceId: string, data?: any) => {
    return await deviceApi.updateDevice(deviceId, data);
  };
}

// Tạo ra một thể hiện của lớp DeviceService và export cho nơi khác sử dụng
const deviceService = new DeviceService();

export default deviceService;
