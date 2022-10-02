import { useState } from "react";
import userService from "src/services/user";

const useRegister = () => {
  // loading: Trạng thái loading khi đang thực hiện thêm tài khoản
  const [loading, setLoading] = useState(false);

  // Hàm giúp đăng ký tài khoản, sử dụng hàm register của userService
  const handleRegister = async ({
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
      const res = (await userService.register(data)) as any;
      if (!res) {
        onSuccess && onSuccess();
      } else {
        onFailed && onFailed("Email existed");
      }
    } catch (error) {
      onFailed && onFailed();
    } finally {
      setLoading(false);
    }
  };

  return { loading, onRegister: handleRegister };
};

export default useRegister;
