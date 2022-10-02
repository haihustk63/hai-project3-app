// import từ các thư viện và module bên ngoài
import { useContext, useState } from "react";

import { AuthContext } from "src/context/AuthContext";
import userService from "src/services/user";
import SecureGateway from "src/store";

const useLogin = () => {
  // loading: Trạng thái loading của thiết bị khi thực hiện đăng nhập
  const [loading, setLoading] = useState(false);
  // Lấy ra hàm setRefresh từ AuthContext
  const { setRefresh } = useContext(AuthContext) as any;

  // Hàm thực hiện đăng nhập
  const handleLogin = async ({
    data,
    onSuccess,
    onFailed,
  }: {
    data: any;
    onSuccess?: any;
    onFailed?: any;
  }) => {
    try {
      setLoading(true);
      // Sử dụng hàm login của userService
      const res = (await userService.login(data)) as any;

      // Nếu đăng nhập thành công thì lưu thông tin bằng SecureGateway.save()
      // Ngược lại thì gọi hàm onFailed được truyền qua tham số của handleLogin
      if (res.status === 200) {
        await SecureGateway.save(res.data);
        onSuccess && onSuccess(res.data);
      } else {
        onFailed && onFailed("Account does not exist");
      }
    } catch (error) {
      onFailed && onFailed();
    } finally {
      // Sau đó setRefresh(true) để cập nhật lại state trong AuthContext
      setRefresh(true);
      setLoading(false);
    }
  };

  return { loading, onLogin: handleLogin };
};

export default useLogin;
