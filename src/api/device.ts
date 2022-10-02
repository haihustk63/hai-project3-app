// import thư viện axios
import axios from "axios";

// import API_ROUTES từ constants
import { API_ROUTES } from "src/constant";

// deviceApi chứa các hàm gọi đến api của phần devices
const deviceApi = {
  //Hàm lấy danh sách thiết bị theo id của người dùng (personId)
  getAllDevices: async ({ personId }: { personId: string }) => {
    try {
      const result = await axios.get(API_ROUTES.DEVICE, {
        params: { personId },
      });

      return result;
    } catch (error) {}
  },

  // Hàm này lấy toàn bộ danh sách thiết bị, chỉ dành cho admin
  getAllDevicesAdmin: async () => {
    try {
      const result = await axios.get(API_ROUTES.DEVICE_ADMIN);

      return result;
    } catch (error) {}
  },

  // Hàm này lấy danh sách các loại thiết bị trong hệ thống
  getAllDeviceType: async () => {
    try {
      const result = await axios.get(API_ROUTES.DEVICE_TYPE);

      return result;
    } catch (error) {}
  },

  // Hàm này giúp tạo một thiết bị mới
  createDevice: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.DEVICE, data);

      return result;
    } catch (error) {}
  },

  // Hàm này để yêu cầu bật toàn bộ thiết bị ánh sáng theo phòng
  // room: Số phòng
  // value: 1/0 (ON/OFF)
  turnOnAllDeviceByRoom: async (room: number, value: number) => {
    try {
      await axios.patch(API_ROUTES.DEVICE_WITH_ROOM(room), { value });
    } catch (error) {
      console.log(error);
    }
  },

  // Hàm giúp xóa một thiết bị theo id (deviceId)
  deleteDevice: async (deviceId: any) => {
    try {
      const result = await axios.delete(API_ROUTES.DEVICE_WITH_ID(deviceId));

      return result;
    } catch (error) {}
  },

  // Hàm này giúp update giá trị của thiết bị theo id (deviceId)
  updateDevice: async (deviceId: string, data?: any) => {
    try {
      let result;
      if (data) {
        result = await axios.patch(API_ROUTES.DEVICE_WITH_ID(deviceId), data);
      } else {
        result = await axios.patch(API_ROUTES.DEVICE_WITH_ID(deviceId));
      }

      return result;
    } catch (error) {}
  },
};

export default deviceApi;
