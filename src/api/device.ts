import axios from "axios";
import { API_ROUTES } from "src/constant";

const deviceApi = {
  getAllDevices: async ({ personId }: { personId: string }) => {
    try {
      const result = await axios.get(API_ROUTES.DEVICE, {
        params: { personId },
      });

      return result;
    } catch (error) {}
  },

  getAllDeviceType: async () => {
    try {
      const result = await axios.get(API_ROUTES.DEVICE_TYPE);

      return result;
    } catch (error) {}
  },

  createDevice: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.DEVICE, data);

      return result;
    } catch (error) {}
  },

  updateDevice: async (deviceId: string) => {
    try {
      const result = await axios.patch(API_ROUTES.DEVICE_WITH_ID(deviceId));

      return result;
    } catch (error) {}
  },
};

export default deviceApi;
