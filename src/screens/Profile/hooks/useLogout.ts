import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import SecureGateway from "src/store";

// Custom hook useLogout chứa hàm giúp đăng xuất khỏi hệ thống
const useLogout = () => {
  const { setRefresh } = useContext(AuthContext) as any;

  const handleLogout = async () => {
    try {
      // Công việc của handleLogout là xóa thông tin người dùng hiện tại
      // và gọi setRefresh(true) để cập nhật lại các state trong AuthContext
      await SecureGateway.delete();
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  return { onLogout: handleLogout };
};

export default useLogout;
