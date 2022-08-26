import { string, object, number } from "yup";

export const ADD_NEW_DEVICE_FIELD = {
  NAME: "name",
  TYPE: "type",
};

export const ADD_NEW_RULES_FIELD = {
  NAME: "name",
  DEVICE: "device",
  ON_TIME: "onTime",
  OFF_TIME: "offTime",
};

export const REGISTER_FIELD = {
  EMAIL: "email",
  PASSWORD: "password",
  RE_PASSWORD: "rePassword",
};

export const LOGIN_FIELD = {
  EMAIL: "email",
  PASSWORD: "password",
};

export const addNewDeviceSchema = object({
  [ADD_NEW_DEVICE_FIELD.NAME]: string().required("Device name is required"),
  [ADD_NEW_DEVICE_FIELD.TYPE]: string().required("Please select device type"),
});

export const addAutomationRule = object({
  [ADD_NEW_RULES_FIELD.NAME]: string().required("Name is required"),
  [ADD_NEW_RULES_FIELD.DEVICE]: string().required("Please select device"),
  [ADD_NEW_RULES_FIELD.ON_TIME]: string().required(
    "Please choose time to turn on device"
  ),
  [ADD_NEW_RULES_FIELD.OFF_TIME]: string().required(
    "Please choose time to turn off device"
  ),
});

export const loginSchema = object({
  [LOGIN_FIELD.EMAIL]: string()
    .required("Email is required")
    .email("Please enter a valid email"),
  [LOGIN_FIELD.PASSWORD]: string().required("Password is required"),
});

export const registerSchema = object({
  [REGISTER_FIELD.EMAIL]: string()
    .required("Email is required")
    .email("Please enter a valid email"),
  [REGISTER_FIELD.PASSWORD]: string()
    .required("Password is required")
    .min(8, "Please enter at least 8 character"),
  [REGISTER_FIELD.RE_PASSWORD]: string().required(
    "Confirm password is required"
  ),
});
