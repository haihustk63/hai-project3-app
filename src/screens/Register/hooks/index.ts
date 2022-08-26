import { useState } from "react";
import userService from "src/services/user";

const useRegister = () => {
  const [loading, setLoading] = useState(false);

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
      await userService.register(data);
      onSuccess && onSuccess();
    } catch (error) {
      onFailed && onFailed();
    } finally {
      setLoading(false);
    }
  };

  return { loading, onRegister: handleRegister };
};

export default useRegister;