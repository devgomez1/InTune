import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import Footer from "./footer";
import { useFocusEffect } from "@react-navigation/native";

function Profile({ navigation }) {
  const [data, setData] = React.useState({});
  const [userPlaylists, setUserPlaylists] = React.useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim])
  );

  const getProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setData(json);

      // Set the header title to the username
      navigation.setOptions({ title: "@" + json.id });

      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getPlaylists = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setUserPlaylists(json.items);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <LinearGradient
      colors={["#1a1a1a", "#404040"]}
      style={{
        flex: 1,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        <View>
          <ScrollView
            style={{
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Image
                source={{ uri: data.images ? data.images[0].url : null }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  marginTop: 20,
                  alignSelf: "center",
                }}
              />
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    marginRight: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: 50,
                  }}
                >
                  Username: {data.id}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    textAlign: "center",
                    marginRight: 5,
                    fontWeight: "bold",
                    marginTop: 35,
                  }}
                >
                  Email: {data.email}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    textAlign: "center",
                    marginRight: 5,
                    fontWeight: "bold",
                    marginTop: 35,
                  }}
                >
                  Followers: {data.followers ? data.followers.total : null}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    textAlign: "center",
                    marginRight: 5,
                    fontWeight: "bold",
                    marginTop: 35,
                  }}
                >
                  Country: {data.country}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    textAlign: "center",
                    marginRight: 5,
                    fontWeight: "bold",
                    marginTop: 35,
                  }}
                >
                  Product: {data.product}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    marginRight: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: 35,
                  }}
                >
                  Type: {data.type}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    flexShrink: 1,
                    marginRight: 5,
                    textAlign: "center",
                    fontWeight: "bold",
                    marginTop: 35,
                    marginBottom: 35,
                  }}
                >
                  URI: {data.uri}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginLeft: 15,
                flexShrink: 1,
                marginRight: 5,
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 35,
                marginBottom: 5,
              }}
            >
              Your Playlists:
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {userPlaylists.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 15,
                  }}
                >
                  <View
                    style={{
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 5 }}
                      source={{ uri: item.images[0].url }}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 13,
                      marginTop: 10,
                      width: 100,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <Footer />
          </ScrollView>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

export default Profile;
