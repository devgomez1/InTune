import React from "react";
import { View, Text, Image } from "react-native";

function FollowedArtistsCard({ item }) {
  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 50 }}
        source={{ uri: item.images[0].url }}
      ></Image>
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
  );
}

export default FollowedArtistsCard;
