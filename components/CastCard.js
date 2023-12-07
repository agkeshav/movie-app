import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
export default function CastCard(props) {
  const navigation = useNavigation();
  // console.log(props);
  return (
    <TouchableOpacity
      style={{ margin: 5 }}
      onPress={() => {
        navigation.navigate("PersonScreen",props.item);
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${props.item.profile_path}`,
          }}
          style={{
            height: height * 0.13,
            width: width * 0.26,
            borderRadius: 50,
          }}
        />
        {props.item.length > 15 ? (
          <Text className="text-neutral-200">
            {props.item.name.slice(0, 15)}...
          </Text>
        ) : (
          <Text className="text-neutral-200">{props.item.name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
