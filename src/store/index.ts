import * as ESStore from "expo-secure-store";

export type UserInfo = {
  id: string;
  email: string;
  token: string;
};

const SecureGateway = {
  save: async (info: UserInfo) => {
    try {
      return await ESStore.setItemAsync(
        "user-session",
        JSON.stringify(info),
        {}
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  load: async () => {
    try {
      const info = await ESStore.getItemAsync("user-session", {});
      return JSON.parse(info as string);
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  delete: async () => {
    try {
      return await ESStore.deleteItemAsync("user-session", {});
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default SecureGateway;
