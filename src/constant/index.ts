import { API_URL } from "@env";

export const API_URL_EXPORT = API_URL;

export const BUTTON_TITLE = {
  ADD_AUTOMATION_RULE: "Add Automation Rules",
};

export const ICON_SIZE = {
  VERY_SMALL: 10,
  SMALL: 14,
  MEDIUM: 18,
  LARGE: 22,
};

export const BUTTON_COLOR = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
};

export const API_NAMES = {
  USER: "users",
  DEVICE: "devices",
  RULE: "rules",
};

export const API_ROUTES = {
  USER: `${API_URL}/${API_NAMES.USER}`,
  USER_WITH_ID: (id: string) => `${API_URL}/${API_NAMES.USER}/${id}`,
  USER_LOGIN: `${API_URL}/${API_NAMES.USER}/login`,
  DEVICE: `${API_URL}/${API_NAMES.DEVICE}`,
  DEVICE_WITH_ID: (id: string) => `${API_URL}/${API_NAMES.DEVICE}/${id}`,
  DEVICE_TYPE: `${API_URL}/${API_NAMES.DEVICE}/type`,
  RULE: `${API_URL}/${API_NAMES.RULE}`,
  RULE_WITH_ID: (id: string) => `${API_URL}/${API_NAMES.RULE}/${id}`,
};

export const SCREEN_NAME = {
  HOME: "Home",
  AUTOMATION_RULES: "Automation",
  GARDEN: "Garden",
  ADD_NEW_DEVICE: "Devices",
  LOGIN: "Login",
  REGISTER: "Register",
  PROFILE: "Profile",
};
