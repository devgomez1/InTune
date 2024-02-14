import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import NewReleasesCard from "./newReleases";
import FollowedArtistsCard from "./followedArtists";
import RecentTracksCard from "./recentTracks";

function HomeScreen() {
  const [data, setData] = useState();
  const [newReleases, setNewReleases] = useState();
  const [followedArtists, setFollowedArtists] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();

  //   const [showHeader, setShowHeader] = useState(true);

  //   const handleScroll = (event) => {
  //     const yOffset = event.nativeEvent.contentOffset.y;
  //     if (yOffset > 50 && showHeader) {
  //       setShowHeader(false);
  //     } else if (yOffset <= 50 && !showHeader) {
  //       setShowHeader(true);
  //     }
  //   };

  // Greeting function
  const greeting = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // Get the user's profile
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
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Get New Releases
  const getNewReleases = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await Axios.get(
        "https://api.spotify.com/v1/browse/new-releases?limit=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewReleases(response.data.albums.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNewReleases();
  }, []);

  // Get followed artists
  const getFollowedArtists = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await Axios.get(
        "https://api.spotify.com/v1/me/following?type=artist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowedArtists(response.data.artists.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFollowedArtists();
  }, []);

  // Get recently played
  const getRecentlyPlayed = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await Axios.get(
        "https://api.spotify.com/v1/me/player/recently-played?limit=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecentlyPlayed(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  return (
    <LinearGradient
      colors={["#1a1a1a", "#404040"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView style={{ marginTop: 0 }}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginLeft: 20,
                  resizeMode: "cover",
                  marginTop: 20,
                }}
                source={{ uri: data?.images[0].url }}
              />

              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginLeft: 30,
                    marginTop: 30,
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                  }}
                >
                  {greeting()},
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    marginLeft: 30,
                    marginTop: 5,
                    flexShrink: 1,
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    flexWrap: "wrap",
                  }}
                >
                  {data?.display_name}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 13,
                    marginLeft: 30,
                    flexShrink: 1,
                    marginTop: 7,
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    flexWrap: "wrap",
                  }}
                >
                  {data?.email}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 20,
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  marginBottom: 10,
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                Welcome To InTune
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 15,
                }}
              >
                Lets Dive Deeper Into Your Music.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginLeft: 10,
              marginTop: 45,
              fontWeight: "bold",
            }}
          >
            Artists You Follow
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {followedArtists?.map((item, index) => {
              return <FollowedArtistsCard key={index} item={item} />;
            })}
          </ScrollView>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginLeft: 10,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Some New Tracks For You
          </Text>
          <ScrollView
            horizontal={true}
            indicatorStyle="false"
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", marginTop: 20 }}
          >
            {newReleases?.map((item, index) => {
              return <NewReleasesCard key={index} item={item} />;
            })}
          </ScrollView>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginLeft: 10,
              marginTop: 45,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Recently Played Tracks
          </Text>
          <View style={{ flexDirection: "column" }}>
            {recentlyPlayed?.map((item, index) => {
              return <RecentTracksCard key={index} item={item} />;
            })}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
