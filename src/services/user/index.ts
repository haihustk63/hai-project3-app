// import userApi từ thư mục api/user
import { userApi } from "src/api/user";

// Định nghĩa lớp UserService chứa các hàm gọi đến userApi
class UserService {
  async login(data: any) {
    return await userApi.login(data);
  }

  async register(data: any) {
    return await userApi.register(data);
  }

  async getAllUsers() {
    return await userApi.getAllUsers();
  }
}

// Tạo ra một thể hiện của lớp UserService và export cho nơi khác sử dụng
const userService = new UserService();

export default userService;
