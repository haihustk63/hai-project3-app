// import URL gọi đến server từ file env và export để dùng trong ứng dụng
import { API_URL } from "@env";
export const API_URL_EXPORT = API_URL;

// Định nghĩa các routes để gọi server
export const API_NAMES = {
  USER: "users",
  DEVICE: "devices",
  RULE: "rules",
  RULE_CONDITION: "rules-condition",
};

export const API_ROUTES = {
  USER: `${API_URL}/${API_NAMES.USER}`,
  USER_WITH_ID: (id: string) => `${API_URL}/${API_NAMES.USER}/${id}`,
  USER_LOGIN: `${API_URL}/${API_NAMES.USER}/login`,
  DEVICE: `${API_URL}/${API_NAMES.DEVICE}`,
  DEVICE_ADMIN: `${API_URL}/${API_NAMES.DEVICE}/admin`,
  DEVICE_WITH_ID: (id: string) => `${API_URL}/${API_NAMES.DEVICE}/${id}`,
  DEVICE_WITH_ROOM: (room: number) => `${API_URL}/${API_NAMES.DEVICE}/room/${room}`,
  DEVICE_TYPE: `${API_URL}/${API_NAMES.DEVICE}/type`,
  RULE: `${API_URL}/${API_NAMES.RULE}`,
  RULE_WITH_ID: (id: string) => `${API_URL}/${API_NAMES.RULE}/${id}`,
  RULE_CONDITION: `${API_URL}/${API_NAMES.RULE_CONDITION}`,
};

// Định nghĩa tên các màn hình
export const SCREEN_NAME = {
  HOME: "Home",
  WELCOME: "Welcome",
  RULE: "Rule",
  AUTOMATION_RULES: " Add Rule",
  RULES: "Rules",
  GARDEN: "Garden",
  ADD_NEW_DEVICE: "Add Device",
  LOGIN: "Login",
  REGISTER: "Register",
  PROFILE: "Profile",
  DEVICES: "Devices"
};

// Giá trị min, max cho thanh slider
export const MIN_MAX_SLIDER = {
  MIN: 0,
  MAX: 100,
};

// Giá trị của thiết bị: ON/OFF
export const DEVICE_VALUE_OPTIONS = [
  {
    label: "OFF",
    value: "off",
  },

  {
    label: "ON",
    value: "on",
  },
];
