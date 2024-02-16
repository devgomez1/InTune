import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

function Footer() {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Entypo
        name="spotify"
        size={25}
        color="white"
        style={{ marginTop: 15 }}
      />
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Made by InTune
      </Text>
    </View>
  );
}

export default Footer;
