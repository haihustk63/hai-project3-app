import { useContext, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import userService from "src/services/user";
import SecureGateway from "src/store";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setRefresh } = useContext(AuthContext) as any;

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
      const res = (await userService.login(data)) as any;
      await SecureGateway.save(res.data);
      onSuccess && onSuccess(res.data);
    } catch (error) {
      onFailed && onFailed();
    } finally {
      setRefresh(true);
      setLoading(false);
    }
  };

  return { loading, onLogin: handleLogin };
};

export default useLogin;
