import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function MoviesCard({ item, handleClick }) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={{ height: height * 0.4, width: width * 0.6 }}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
