import { useContext, useEffect, useState } from "react";
import { userApi } from "src/api/user";
import { AuthContext } from "src/context/AuthContext";

const useGetUsers = () => {
  // users: Danh sách người dùng trong hệ thống
  const [users, setUsers] = useState();

  // info của admin
  const { info = {} } = useContext(AuthContext) as any;

  // Khi admin đã đăng nhập sẽ thực hiện lấy danh sách users
  useEffect(() => {
    const getAllUsers = async () => {
      const res = (await userApi.getAllUsers()) as any;
      const data = res?.data;
      // Nếu lấy được danh sách, sẽ lọc admin ra, và chỉ lấy thông tin gồm id và email
      // Lưu danh sách đó vào state users
      if (data && info?.email) {
        const usersData = data
          ?.filter((u: any) => u.email !== info.email)
          .map((u: any) => ({
            value: u?._id,
            label: u?.email,
          }));
        setUsers(usersData);
      }
    };

    getAllUsers();
  }, [info?.email]);

  return { users };
};

export default useGetUsers;
