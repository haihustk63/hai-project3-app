import { useEffect, useState } from "react";
import { userApi } from "src/api/user";

const useGetUsers = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const res = (await userApi.getAllUsers()) as any;
      const data = res?.data;
      if (data) {
        const usersData = data?.map((u: any) => ({
          value: u?._id,
          label: u?.email,
        }));
        setUsers(usersData);
      }
    };

    getAllUsers();
  }, []);

  return { users };
};

export default useGetUsers;
