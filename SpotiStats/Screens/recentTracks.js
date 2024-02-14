import React from "react";
import { View, Text, Image } from "react-native";

function RecentTracksCard({ item }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 5,
          marginBottom: 10,
          marginTop: 10,
          marginLeft: 10,
        }}
        source={{ uri: item.track.album.images[0].url }}
      ></Image>

      <Text
        style={{
          color: "white",
          fontSize: 17,
          marginLeft: 15,
          flexShrink: 1,
          textAlign: "center",
          marginRight: 5,
        }}
      >
        {item.track.name} by {item.track.artists[0].name}
      </Text>
    </View>
  );
}

export default RecentTracksCard;
