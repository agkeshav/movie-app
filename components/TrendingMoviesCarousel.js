import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import MoviesCard from "./MoviesCard";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function TrendingMoviesCarousel({ data }) {
  // console.log(data);
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("MovieScreen", item);
  };
  return (
    <View>
      <Text className="text-white mt-3 mb-2 mx-4">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MoviesCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.8}
        slideStyle={{ display: "flex", alignItems: "center" }}
        sliderWidth={width}
        itemWidth={width * 0.62}
      />
    </View>
  );
}
