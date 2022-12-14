// Import các màn hình
import Garden from "src/screens/Garden";
import Home from "src/screens/Home";
import Login from "src/screens/Login";
import Profile from "src/screens/Profile";
import Register from "src/screens/Register";
import { SCREEN_NAME } from ".";
import AutomationRules from "../screens/AutomationRules";
import Devices from "src/screens/Devices";
import Rules from "src/screens/Rules";
import AddNewDevice from "src/screens/AddNewDevice";

// Các routes (màn) khi chưa đăng nhập: Có màn Login, Register
export const ROUTES_NOT_AUTH = [
  {
    name: SCREEN_NAME.LOGIN,
    component: Login,
  },
  {
    name: SCREEN_NAME.REGISTER,
    component: Register,
  },
];


/* 
Các routes (màn) khi đã đăng nhập làm User
Các trường:
type: Nếu là "stack" thì màn đó sử dụng Stack Navigator
screens: Danh sách các màn trong một Stack Navigator
name: Tên của màn
component: Component của màn
icon: Được sử dụng trong các màn mà dùng Bottom Tab Navigator
*/
export const ROUTES_AUTH = [
  {
    type: "stack",
    name: "Welcome",
    screens: [
      {
        name: SCREEN_NAME.HOME,
        component: Home,
        icon: "home",
      },
      {
        name: SCREEN_NAME.DEVICES,
        component: Devices,
      },
    ],
  },
  {
    type: "stack",
    name: "Rule",
    screens: [
      {
        name: SCREEN_NAME.RULES,
        component: Rules,
        icon: "tasks",
      },
      {
        name: SCREEN_NAME.AUTOMATION_RULES,
        component: AutomationRules,
        icon: "tasks",
      },
    ],
  },
  {
    name: SCREEN_NAME.GARDEN,
    component: Garden,
    icon: "pagelines",
  },
  {
    name: SCREEN_NAME.PROFILE,
    component: Profile,
    icon: "user-o",
  },
];

// Các routes (màn) khi đã đăng nhập làm Admin
// Định nghĩa các trường tương tự như trên
export const ROUTES_AUTH_ADMIN = [
  {
    type: "stack",
    name: "Home",
    screens: [
      {
        name: SCREEN_NAME.DEVICES,
        component: Devices,
        icon: "lightbulb-o",
      },
      {
        name: SCREEN_NAME.ADD_NEW_DEVICE,
        component: AddNewDevice,
      },
    ],
  },
  {
    name: SCREEN_NAME.PROFILE,
    component: Profile,
    icon: "user-o",
  },
];
