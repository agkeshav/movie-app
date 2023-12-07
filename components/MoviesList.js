import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function MoviesList({ data, title, seeAll }) {
  // console.log(data);
  const navigation = useNavigation();

  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Text className="text-white mt-5 mb-2 mx-4">{title}</Text>
        {seeAll ? (
          <Text
            className="mt-5 mb-2 mx-4"
            style={{ color: "#eab308", fontWeight: "bold", marginRight: 20 }}
          >
            See All
          </Text>
        ) : null}
      </View>
      <ScrollView>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MovieScreen", item)}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{
                  height: height * 0.25,
                  width: width * 0.4,
                  marginHorizontal: 5,
                }}
                className="rounded-2xl"
              />
              {item.title.length > 20 ? (
                <Text className="text-white ml-4">
                  {item.title.slice(0, 15)}...
                </Text>
              ) : (
                <Text className="text-white ml-4">{item.title}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}
