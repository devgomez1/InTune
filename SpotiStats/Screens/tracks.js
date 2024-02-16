import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import Footer from "./footer";

function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [fadeAnims, setFadeAnims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopTracks(timeRange);
  }, [timeRange]);

  const getTopTracks = async (range) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${range}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setTracks(json.items);

      // Initialize fadeAnims with a new Animated.Value for each track
      const newFadeAnims = json.items.map(() => new Animated.Value(0));
      setFadeAnims(newFadeAnims);

      newFadeAnims.forEach((fadeAnim) => {
        const delay = Math.random() * 1000;
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => setLoading(false));
        }, delay);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderTracks = () => {
    const rows = [];
    for (let i = 0; i < tracks.length; i += 3) {
      const row = tracks.slice(i, i + 3);
      rows.push(
        <View
          key={i}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          {row.map((track, index) => (
            <Animated.View
              key={index}
              style={{
                flexDirection: "column",
                alignItems: "center",
                opacity: fadeAnims[i + index], // Use the animation value for this track
              }}
            >
              <Image
                source={{ uri: track.album.images[2].url }}
                style={{ width: 100, height: 100 }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  width: 100,
                  textAlign: "center",
                  overflow: "hidden",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {track.name}
              </Text>
            </Animated.View>
          ))}
        </View>
      );
    }
    return rows;
  };

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
              <Text style={{ color: "white" }}>1 Month</Text>
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
              <Text style={{ color: "white" }}>6 Months</Text>
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
              <Text style={{ color: "white" }}>All Time</Text>
            </TouchableOpacity>
          </View>
          {!loading && renderTracks()}
          <Footer />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default TopTracks;
