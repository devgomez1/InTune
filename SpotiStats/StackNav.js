import React from "react";
import HomeScreen from "./Screens/home";
import ProfileScreen from "./Screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/loginScreen";

const TabNavigator = createBottomTabNavigator();

function MyTabs() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <TabNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </TabNavigator.Navigator>
  );
}

const Stack = createStackNavigator();
function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
