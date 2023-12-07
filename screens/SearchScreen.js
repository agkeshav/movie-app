import {
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const [results, setResults] = useState([
    { title: "Marvel" },
    { title: "Avengers Infinity War" },
    { title: "Iron Man" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [showSearches, setShowSearches] = useState(true);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-neutral-800 flex-1 flex-col">
      <View
        className="mb-3 mx-4 mt-10 border-neutral-500 flex-row justify-between"
        style={{ borderRadius: 30, borderWidth: 1 }}
      >
        <TextInput
          placeholder="Search Movie"
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
          className="p-2 ml-1 text-white"
          placeholderTextColor={"lightgray"}
          onFocus={() => setShowSearches(false)}
        />
        <TouchableOpacity
          className="bg-neutral-700 rounded-full p-1 m-1"
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <XMarkIcon size={30} color={"gray"} />
        </TouchableOpacity>
      </View>
      {showSearches ? (
        <Image
          source={require("../assets/images/movieTime.png")}
          style={{
            width: width,
            height: height * 0.55,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      ) : (
        <ScrollView horizontal={false}>
          <View className="mx-4">
            <Text className="text-white mb-2">Results({results.length})</Text>
            <View className="flex-row flex-wrap justify-between">
              {results.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("MovieScreen", item);
                    }}
                  >
                    <View className="m-1">
                      <Image
                        source={require("../assets/images/moviePoster1.png")}
                        style={{ height: height * 0.25, width: width * 0.4 }}
                        className="rounded-2xl"
                      />
                      <Text className="text-neutral-400 text-m">
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
