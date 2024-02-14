import React from "react";
import { View, Text, Image } from "react-native";

function NewReleasesCard({ item }) {
  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
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
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>
    </View>
  );
}

export default NewReleasesCard;
