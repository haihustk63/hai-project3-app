import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";

import AuthProvider, { AuthContext } from "src/context/AuthContext";
import DeviceProvider from "src/context/DeviceContect";
import RuleProvider from "src/context/RuleContext";
import { ROUTES_AUTH, ROUTES_AUTH_ADMIN, ROUTES_NOT_AUTH } from "./src/constant/routes";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

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

const Navigation = () => {
  const { auth, loading, isAdmin } = useContext(AuthContext) as any;

  if (loading) return null;

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

export default function App() {
  // console.log("ap auth", auth);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
