// import một số phương thức của thư viện yup
import { string, object, ref, number } from "yup";

// Định nghĩa các trường dữ liệu khi thêm một device
export const ADD_NEW_DEVICE_FIELD = {
  NAME: "name",
  TYPE: "type",
  PORT: "port",
  PERSON: "personId",
  FLOOR: "floor",
  ROOM: "room",
};

// Định nghĩa các trường dữ liệu khi thêm một luật tự động
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

// Định nghĩa các trường dữ liệu khi đăng ký tài khoản
export const REGISTER_FIELD = {
  EMAIL: "email",
  PASSWORD: "password",
  RE_PASSWORD: "rePassword",
};

// Định nghĩa các trường dữ liệu khi đăng nhập
export const LOGIN_FIELD = {
  EMAIL: "email",
  PASSWORD: "password",
};

/* 
Lược đồ validate thông tin thêm mới thiết bị
Yêu cầu các trường name, type, port, person, floor, room đều phải có
Trong đó trường port không được trùng các port đã dùng rồi
*/
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

/*
Lược đồ validate thông tin thêm mới luật tự động theo thời gian
Yêu cầu phải có các trường name, device, onTime (thời gian bật) hoặc offTime (thời gian tắt)
*/
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

// Lược đồ validate thông tin thêm mới luật phụ thuộc
// Yêu cầu gồm các trường name, preDevice, preValue, afterDevice, afterValue
export const addAutomationRuleCondition = object({
  [ADD_NEW_RULES_FIELD.NAME]: string().required("Name is required"),
  [ADD_NEW_RULES_FIELD.PRE_DEVICE]: string().required("Please select device"),
  [ADD_NEW_RULES_FIELD.PRE_VALUE]: string().required("Please choose status"),
  [ADD_NEW_RULES_FIELD.AFTER_DEVICE]: string().required("Please select device"),
  [ADD_NEW_RULES_FIELD.AFTER_VALUE]: string().required("Please choose status"),
});

/* 
Lược đồ validate thông tin khi đăng nhập
Yêu cầu có email và password
Email thì phải đúng định dạng
*/
export const loginSchema = object({
  [LOGIN_FIELD.EMAIL]: string()
    .required("Email is required")
    .email("Please enter a valid email"),
  [LOGIN_FIELD.PASSWORD]: string().required("Password is required"),
});

/* 
Lược đồ validate thông tin khi đăng ký tài khoản
Yêu cầu email, password, confirm password
Trong đó email phải đúng định dạng
Password cần tối thiểu 8 ký tự và confirm password phải match password
*/
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
