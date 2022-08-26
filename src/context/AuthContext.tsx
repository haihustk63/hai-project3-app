import { createContext, useEffect, useState } from "react";
import SecureGateway from "src/store";

export const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = useState(false);
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const getAuth = async () => {
    try {
      setLoading(true);
      const info = await SecureGateway.load();
      if (info) {
        setAuth(true);
        setInfo(info);
      } else {
        setAuth(false);
        setInfo(undefined);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (refresh) {
      getAuth();
    }
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{ loading, auth, refresh, setRefresh, info, setInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
