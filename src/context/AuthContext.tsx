// import các hàm createContext, các hooks từ react và SecureGateway
import { createContext, useEffect, useState } from "react";
import SecureGateway from "src/store";

// Tạo AuthContext
export const AuthContext = createContext({}) as any;

const AuthProvider = ({ children }: { children: any }) => {
  /*
  Các states:
  auth: Xác định người dùng đã đăng nhập hay chưa
  info: Thông tin của người dùng
  isAdmin: Người dùng có là Admin hay không
  loading: Trạng thái loading khi lấy thông tin
  refresh: Khi refresh là true thì lấy lại data 
  */
  const [auth, setAuth] = useState(false);
  const [info, setInfo] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  // Hàm thực hiện lấy thông tin từ SecureGateway và đặt giá trị cho các state
  const getAuth = async () => {
    try {
      setLoading(true);
      const info = await SecureGateway.load();
      if (info) {
        setAuth(true);
        setInfo(info);
        setIsAdmin(info?.role);
      } else {
        setAuth(false);
        setInfo(undefined);
        setIsAdmin(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  // Khi app render lần đầu sẽ lấy lại thông tin người dùng
  useEffect(() => {
    getAuth();
  }, []);

  // Khi refresh thay đổi và bằng true sẽ lấy lại thông tin người dùng
  useEffect(() => {
    if (refresh) {
      getAuth();
    }
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{ loading, auth, refresh, setRefresh, info, setInfo, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
