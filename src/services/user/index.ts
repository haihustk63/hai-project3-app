import { userApi } from "src/api/user";

class UserService {
  async login(data: any) {
    return await userApi.login(data);
  }

  async register(data: any) {
    return await userApi.register(data);
  }
}

const userService = new UserService();

export default userService;
