import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import Footer from "./footer";
import { useFocusEffect } from "@react-navigation/native";

function TopArtists() {
  const [data, setData] = useState({});
  const [timeRange, setTimeRange] = useState("short_term");
  const [fadeAnims, setFadeAnims] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTopArtists = async (range) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${range}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setData(json);

      // Initialize fadeAnims with a new Animated.Value for each artist
      const newFadeAnims = json.items.map(() => new Animated.Value(0));
      setFadeAnims(newFadeAnims);

      // Start the animations
      newFadeAnims.forEach((fadeAnim) => {
        const delay = Math.random() * 1000;
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }, delay);
      });

      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopArtists(timeRange);
  }, [timeRange]);

  useEffect(() => {
    setFadeAnims(data.items ? data.items.map(() => new Animated.Value(0)) : []);
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      getTopArtists(timeRange);
    }, [timeRange])
  );

  useEffect(() => {
    fadeAnims.forEach((fadeAnim, index) => {
      const delay = Math.random() * 1000;
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }, delay);
    });
  }, [fadeAnims]);

  return (
    <LinearGradient
      colors={["#1a1a1a", "#404040"]}
      style={{
        flex: 1,
      }}
    >
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => setTimeRange("short_term")}
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                width: 100,
              }}
            >
              <Text style={{ color: "white" }}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeRange("medium_term")}
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                width: 100,
              }}
            >
              <Text style={{ color: "white" }}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeRange("long_term")}
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                alignItems: "center",
                width: 100,
              }}
            >
              <Text style={{ color: "white" }}>Six Months</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {data.items &&
              data.items.map((item, index) => (
                <Animated.View
                  key={index}
                  style={{
                    marginBottom: 20,
                    justifyContent: "center",
                    opacity: fadeAnims[index]
                      ? fadeAnims[index]
                      : new Animated.Value(0),
                  }}
                >
                  <Image
                    source={{ uri: item.images[0].url }}
                    style={{
                      width: 100,
                      height: 100,
                      margin: 10,
                      borderRadius: 50,
                    }}
                  />
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      margin: 10,
                      width: 100,
                      fontWeight: "bold",
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                </Animated.View>
              ))}
          </View>
          <Footer />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default TopArtists;
