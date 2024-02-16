import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const expiration = await AsyncStorage.getItem("expiration");
      console.log(token, expiration);

      if (token && expiration && Date.now() < parseInt(expiration)) {
        navigation.navigate("Tabs");
      } else {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("expiration");
        navigation.navigate("Login");
      }
    };
    checkToken();
  }, []);

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      responseType: AuthSession.ResponseType.Token,
      clientId: "3023eefdc1d24372b15145d96f5a2ebf",
      scopes: [
        "user-read-email",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "app-remote-control",
        "streaming",
        "user-read-private",
        "user-follow-read",
        "user-read-recently-played",
        "user-top-read",
      ],
      redirectUri: "exp://192.168.1.167:8081/",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      const { access_token, expires_in } = response.params;

      const expiration = new Date().getTime() + expires_in * 1000;
      AsyncStorage.setItem("token", access_token);
      AsyncStorage.setItem("expiration", expiration.toString());
      navigation.navigate("Tabs");
    } else if (response?.type === "error") {
      console.log(response);
    }
  }, [response]);

  return (
    <LinearGradient
      colors={["#1a1a1a", "#404040"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView>
        <View
          style={{
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 300,
          }}
        >
          <Entypo name="spotify" size={80} color="white" />
        </View>
        <View
          style={{ height: 80, justifyContent: "center", alignItems: "center" }}
        >
          <Pressable
            onPress={() => {
              promptAsync();
            }}
            style={{
              backgroundColor: "black",
              width: 200,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white" }}>Log In With Spotify</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
