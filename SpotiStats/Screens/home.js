import React from "react";
import { Animated, Image, Text, View } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import NewReleasesCard from "./newReleases";
import FollowedArtistsCard from "./followedArtists";
import RecentTracksCard from "./recentTracks";
import { useRef } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Footer from "./footer";

function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [newReleases, setNewReleases] = useState();
  const [followedArtists, setFollowedArtists] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [greetingOpacity, setGreetingOpacity] = useState(new Animated.Value(0));
  const [nameOpacity, setNameOpacity] = useState(new Animated.Value(0));
  const [emailOpacity, setEmailOpacity] = useState(new Animated.Value(0));
  const [welcomeOpacity, setWelcomeOpacity] = useState(new Animated.Value(0));

  // Opacities for the cards
  const newReleasesOpacities = newReleases
    ? newReleases.map(() => new Animated.Value(0))
    : [];

  const artistYouFollowOpacities = followedArtists
    ? followedArtists.map(() => new Animated.Value(0))
    : [];

  const recentlyPlayedOpacities = recentlyPlayed
    ? recentlyPlayed.map(() => new Animated.Value(0))
    : [];

  // Header animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [300, 100],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useFocusEffect(
    React.useCallback(() => {
      newReleasesOpacities.forEach((opacity) => {
        opacity.setValue(0); // Reset the opacity to 0

        const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000, // The duration of the animation in milliseconds
            useNativeDriver: true,
          }).start();
        }, delay);
      });
    }, [newReleasesOpacities])
  );

  useFocusEffect(
    React.useCallback(() => {
      artistYouFollowOpacities.forEach((opacity) => {
        opacity.setValue(0); // Reset the opacity to 0

        const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000, // The duration of the animation in milliseconds
            useNativeDriver: true,
          }).start();
        }, delay);
      });
    }, [artistYouFollowOpacities])
  );

  useFocusEffect(
    React.useCallback(() => {
      recentlyPlayedOpacities.forEach((opacity) => {
        opacity.setValue(0); // Reset the opacity to 0

        const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000, // The duration of the animation in milliseconds
            useNativeDriver: true,
          }).start();
        }, delay);
      });
    }, [recentlyPlayedOpacities])
  );

  useFocusEffect(
    React.useCallback(() => {
      greetingOpacity.setValue(0); // Reset the opacity to 0

      const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

      setTimeout(() => {
        Animated.timing(greetingOpacity, {
          toValue: 1,
          duration: 1000, // The duration of the animation in milliseconds
          useNativeDriver: true,
        }).start();
      }, delay);
    }, [greetingOpacity])
  );

  useFocusEffect(
    React.useCallback(() => {
      nameOpacity.setValue(0); // Reset the opacity to 0

      const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

      setTimeout(() => {
        Animated.timing(nameOpacity, {
          toValue: 1,
          duration: 1000, // The duration of the animation in milliseconds
          useNativeDriver: true,
        }).start();
      }, delay);
    }, [nameOpacity])
  );

  useFocusEffect(
    React.useCallback(() => {
      emailOpacity.setValue(0); // Reset the opacity to 0

      const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

      setTimeout(() => {
        Animated.timing(emailOpacity, {
          toValue: 1,
          duration: 1000, // The duration of the animation in milliseconds
          useNativeDriver: true,
        }).start();
      }, delay);
    }, [emailOpacity])
  );

  useFocusEffect(
    React.useCallback(() => {
      welcomeOpacity.setValue(0); // Reset the opacity to 0

      const delay = Math.random() * 1000; // Generate a random delay between 0 and 1000 milliseconds

      setTimeout(() => {
        Animated.timing(welcomeOpacity, {
          toValue: 1,
          duration: 1000, // The duration of the animation in milliseconds
          useNativeDriver: true,
        }).start();
      }, delay);
    }, [welcomeOpacity])
  );

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

      // Set the header title to the username
      navigation.setOptions({ title: "@" + json.id });

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
        "https://api.spotify.com/v1/me/player/recently-played?limit=40",
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
      <Animated.ScrollView
        style={{ marginTop: 0 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Animated.View
          style={{
            height: headerHeight,
            opacity: headerOpacity,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View style={{ marginTop: 25 }}>
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
                <Animated.Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    marginLeft: 30,
                    marginTop: 30,
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    opacity: greetingOpacity,
                  }}
                >
                  {greeting()},
                </Animated.Text>
                <Animated.Text
                  style={{
                    color: "white",
                    fontSize: 30,
                    marginLeft: 30,
                    marginTop: 5,
                    flexShrink: 1,
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    flexWrap: "wrap",
                    opacity: nameOpacity,
                  }}
                >
                  {data?.display_name}
                </Animated.Text>
                <Animated.Text
                  style={{
                    color: "grey",
                    fontSize: 13,
                    marginLeft: 30,
                    flexShrink: 1,
                    marginTop: 7,
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    flexWrap: "wrap",
                    opacity: emailOpacity,
                  }}
                >
                  {data?.email}
                </Animated.Text>
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
              <Animated.Text
                style={{
                  color: "white",
                  fontSize: 30,
                  marginBottom: 10,
                  marginTop: 10,
                  fontWeight: "bold",
                  opacity: welcomeOpacity,
                }}
              >
                Welcome To InTune
              </Animated.Text>
              <Animated.Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 15,
                  opacity: welcomeOpacity,
                }}
              >
                Lets Dive Deeper Into Your Music.
              </Animated.Text>
            </View>
          </View>
        </Animated.View>
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
            indicatorStyle="false"
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {followedArtists?.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  style={{ opacity: artistYouFollowOpacities[index] }}
                >
                  <FollowedArtistsCard item={item} />
                </Animated.View>
              );
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
          <Animated.View>
            <ScrollView
              horizontal={true}
              indicatorStyle="false"
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row", marginTop: 20 }}
            >
              {newReleases?.map((item, index) => {
                return (
                  <Animated.View
                    key={index}
                    style={{ opacity: newReleasesOpacities[index] }}
                  >
                    <NewReleasesCard item={item} />
                  </Animated.View>
                );
              })}
            </ScrollView>
          </Animated.View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginLeft: 10,
              marginTop: 45,
              fontWeight: "bold",
              marginBottom: 17,
            }}
          >
            Recently Played Tracks
          </Text>
          <View style={{ flexDirection: "column" }}>
            {recentlyPlayed?.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  style={{ opacity: recentlyPlayedOpacities[index] }}
                >
                  <RecentTracksCard item={item} />
                </Animated.View>
              );
            })}
          </View>
          <Footer />
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
}

export default HomeScreen;
