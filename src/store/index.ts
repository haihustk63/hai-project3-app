// import EncryptedStorage from "react-native-encrypted-storage";

// export type UserInfo = {
//   id: string;
//   email: string;
//   token: string;
// };

// const SecureGateway = {
//   save: async (info: UserInfo) => {
//     try {
//       await EncryptedStorage.setItem("user-session", JSON.stringify(info));
//     } catch (error) {
//       return null;
//     }
//   },

//   load: async () => {
//     try {
//       const session = await EncryptedStorage.getItem("user-session");

//       if (session) {
//         const info: UserInfo = JSON.parse(session);
//         return info;
//       }
//       return false;
//     } catch (error) {
//       return null;
//     }
//   },

//   delete: async () => {
//     try {
//       await EncryptedStorage.removeItem("user-session");
//       return true;
//     } catch (error) {
//       return null;
//     }
//   },
// };

// export default SecureGateway;

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
