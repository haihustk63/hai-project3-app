// Import thư viện axios
import axios from "axios";

// import API_ROUTES ở thư mục constants
import { API_ROUTES } from "src/constant";

// Tạo một object userApi
export const userApi = {
  // login: Đăng nhập
  // data: Thông tin cần để đăng nhập
  login: async (data: any) => {
    try {
      const result = await axios.post(API_ROUTES.USER_LOGIN, data);
      return result;
    } catch (error) {
      return error;
    }
  },

  // register: Đăng ký tài khoản
  // data: Thông tin cần để đăng ký
  register: async (data: any) => {
    try {
      await axios.post(API_ROUTES.USER, data);
    } catch (error) {
      return error;
    }
  },

  //getAllUsers: Lấy danh sách người dùng trong hệ thống
  getAllUsers: async () => {
    try {
      return await axios.get(API_ROUTES.USER);
    } catch (error) {
      return error;
    }
  },
};
