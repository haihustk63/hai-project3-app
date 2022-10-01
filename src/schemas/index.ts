import { string, object, ref, number } from "yup";

export const ADD_NEW_DEVICE_FIELD = {
  NAME: "name",
  TYPE: "type",
  PORT: "port",
  PERSON: "personId",
  FLOOR: "floor",
  ROOM: "room",
};

export const ADD_NEW_RULES_FIELD = {
  NAME: "name",
  DEVICE: "device",
  ON_TIME: "onTime",
  OFF_TIME: "offTime",
  PRE_DEVICE: "preDevice",
  AFTER_DEVICE: "afterDevice",
  PRE_VALUE: "preValue",
  AFTER_VALUE: "afterValue",
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

export const addNewDeviceSchema = (ports: any[]) =>
  object({
    [ADD_NEW_DEVICE_FIELD.NAME]: string().required("Device name is required"),
    [ADD_NEW_DEVICE_FIELD.TYPE]: string().required("Please select device type"),
    [ADD_NEW_DEVICE_FIELD.PORT]: number()
      .required("Port is required")
      .notOneOf(ports),
    [ADD_NEW_DEVICE_FIELD.PERSON]: string().required("Please choose an user"),
    [ADD_NEW_DEVICE_FIELD.FLOOR]: number().required("Floor is required"),
    [ADD_NEW_DEVICE_FIELD.ROOM]: number().required("Room is required"),
  });

export const addAutomationRuleTime = object({
  [ADD_NEW_RULES_FIELD.NAME]: string().required("Name is required"),
  [ADD_NEW_RULES_FIELD.DEVICE]: string().required("Please select device"),
  [ADD_NEW_RULES_FIELD.ON_TIME]: string().required(
    "Please choose time to turn on device"
  ),
  [ADD_NEW_RULES_FIELD.OFF_TIME]: string().required(
    "Please choose time to turn off device"
  ),
});

export const addAutomationRuleCondition = object({
  [ADD_NEW_RULES_FIELD.NAME]: string().required("Name is required"),
  [ADD_NEW_RULES_FIELD.PRE_DEVICE]: string().required("Please select device"),
  [ADD_NEW_RULES_FIELD.PRE_VALUE]: string().required("Please choose status"),
  [ADD_NEW_RULES_FIELD.AFTER_DEVICE]: string().required("Please select device"),
  [ADD_NEW_RULES_FIELD.AFTER_VALUE]: string().required("Please choose status"),
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
  [REGISTER_FIELD.RE_PASSWORD]: string()
    .required("Confirm password is required")
    .oneOf(
      [ref(REGISTER_FIELD.PASSWORD), null],
      "Confirm password do not match password"
    ),
});
