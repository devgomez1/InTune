import React from "react";
import HomeScreen from "./Screens/home";
import TopArtists from "./Screens/Artists";
import TopTracks from "./Screens/tracks";
import ProfileScreen from "./Screens/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/loginScreen";
import { StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator();

function MyTabs() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <TabNavigator.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "rgba(0, 0, 0, 1)",
          },
        }}
      >
        <TabNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#404040" },
            headerTintColor: "white", // This will set the header text color to white
            headerTitleAlign: "center", // This will align the header title to the center
            headerLeft: () => (
              <Entypo
                name="spotify"
                size={25}
                color="white"
                style={{ marginLeft: 15 }}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
            tabBarLabel: () => null, // This will hide the label
          }}
        />

        <TabNavigator.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#404040" },
            headerTintColor: "white", // This will set the header text color to white
            headerTitleAlign: "center", // This will align the header title to the center
            headerLeft: () => (
              <Entypo
                name="spotify"
                size={25}
                color="white"
                style={{ marginLeft: 15 }}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="man" size={size} color={color} />
            ),
            tabBarLabel: () => null, // This will hide the label
          }}
        />
        <TabNavigator.Screen
          name="Top Artists"
          component={TopArtists}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#404040" },
            headerTintColor: "white", // This will set the header text color to white
            headerTitleAlign: "center", // This will align the header title to the center
            headerLeft: () => (
              <Entypo
                name="spotify"
                size={25}
                color="white"
                style={{ marginLeft: 15 }}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="users" size={size} color={color} />
            ),
            tabBarLabel: () => null, // This will hide the label
          }}
        />
        <TabNavigator.Screen
          name="Top Tracks"
          component={TopTracks}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#404040" },
            headerTintColor: "white", // This will set the header text color to white
            headerTitleAlign: "center", // This will align the header title to the center
            headerLeft: () => (
              <Entypo
                name="spotify"
                size={25}
                color="white"
                style={{ marginLeft: 15 }}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Entypo name="music" size={size} color={color} />
            ),
            tabBarLabel: () => null, // This will hide the label
          }}
        />
      </TabNavigator.Navigator>
    </>
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
