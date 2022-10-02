// import thư viện expo-secure-store
import * as ESStore from "expo-secure-store";

// Định dạng thông tin cần lưu
export type UserInfo = {
  id: string;
  email: string;
  token: string;
  role: number;
};

// Đối tượng SecureGateway chứa các phương thức
// save: Lưu thông tin
// load: Lấy thông tin đã lưu
// delete: Xóa thông tin đã lưu
const SecureGateway = {
  save: async (info: UserInfo) => {
    try {
      return await ESStore.setItemAsync(
        "user-session",
        JSON.stringify(info),
        {}
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  load: async () => {
    try {
      const info = await ESStore.getItemAsync("user-session", {});
      return JSON.parse(info as string);
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  delete: async () => {
    try {
      return await ESStore.deleteItemAsync("user-session", {});
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default SecureGateway;
