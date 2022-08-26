import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import SecureGateway from "src/store";

const useLogout = () => {
  const { setRefresh } = useContext(AuthContext) as any;

  const handleLogout = async () => {
    try {
      await SecureGateway.delete();
      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };

  return { onLogout: handleLogout };
};

export default useLogout;
