// import từ các thư viện
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";

// import từ các module ngoài: Các context, hằng số
import AuthProvider, { AuthContext } from "src/context/AuthContext";
import DeviceProvider from "src/context/DeviceContext";
import RuleProvider from "src/context/RuleContext";
import { ROUTES_AUTH, ROUTES_AUTH_ADMIN, ROUTES_NOT_AUTH } from "src/constant/routes";

// Sử dụng các hàm của React Navigation
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// Hàm tạo một Stack Navigation gồm các màn hình trong tham số screens
const makeStackNavigation = (screens: any) => () => {
  return (
    <Stack.Navigator initialRouteName={screens?.[0].name}>
      {screens?.map((route: any) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
};

// Hàm này sử dụng thông tin xác thực người dùng để tạo ra các navigator
const Navigation = () => {
  const { auth, loading, isAdmin } = useContext(AuthContext) as any;

  if (loading) return null;

  /*
  Cụ thể:
  Nếu chưa đăng nhập, thì truy cập được màn Login, Register
  Nếu đã đăng nhập rồi nhưng role là User thì truy cập các màn dành cho User
  Nếu đã đăng nhập nhưng role là Admin thì truy cập các màn dành cho Admin
  */
  return (
    <NavigationContainer>
      {!auth && (
        <Stack.Navigator initialRouteName={ROUTES_NOT_AUTH[0].name}>
          {ROUTES_NOT_AUTH.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Navigator>
      )}

      {auth && !isAdmin && (
        <BottomTab.Navigator initialRouteName={ROUTES_AUTH[0].name}>
          {ROUTES_AUTH.map((route) => {
            if (route.type === "stack") {
              return (
                <BottomTab.Screen
                  key={route.name}
                  name={route.name}
                  component={makeStackNavigation(route.screens) as any}
                  options={{
                    tabBarLabel: route?.name,
                    tabBarIcon: ({ color, size }) => (
                      <Icon
                        name={route?.screens?.[0].icon || ""}
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              );
            } else {
              return (
                <BottomTab.Screen
                  key={route.name}
                  name={route.name}
                  component={route.component as any}
                  options={{
                    tabBarLabel: route.name,
                    tabBarIcon: ({ color, size }) => (
                      <Icon name={route.icon as any} color={color} size={size} />
                    ),
                  }}
                />
              );
            }
          })}
        </BottomTab.Navigator>
      )}
      {auth && !!isAdmin && (
        <BottomTab.Navigator initialRouteName={ROUTES_AUTH_ADMIN[0].name}>
          {ROUTES_AUTH_ADMIN.map((route) => {
            if (route.type === "stack") {
              return (
                <BottomTab.Screen
                  key={route.name}
                  name={route.name}
                  component={makeStackNavigation(route.screens) as any}
                  options={{
                    tabBarLabel: route?.name,
                    tabBarIcon: ({ color, size }) => (
                      <Icon
                        name={route?.screens?.[0].icon || ""}
                        color={color}
                        size={size}
                      />
                    ),
                  }}
                />
              );
            } else {
              return (
                <BottomTab.Screen
                  key={route.name}
                  name={route.name}
                  component={route.component as any}
                  options={{
                    tabBarLabel: route.name,
                    tabBarIcon: ({ color, size }) => (
                      <Icon name={route.icon as any} color={color} size={size} />
                    ),
                  }}
                />
              );
            }
          })}
        </BottomTab.Navigator>
      )}
    </NavigationContainer>
  );
};

// Bọc nội dung của App bằng các Provider để sử dụng các hàm, state mà các context tương ứng cung cấp
export default function App() {
  return (
    <AuthProvider>
      <DeviceProvider>
        <RuleProvider>
          <SafeAreaView style={styles.container}>
            <Navigation />
            <FlashMessage position="bottom" />
          </SafeAreaView>
        </RuleProvider>
      </DeviceProvider>
    </AuthProvider>
  );
}

// Custom style cho App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
