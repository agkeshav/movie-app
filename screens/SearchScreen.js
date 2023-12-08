import {
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "../api/api";
import React, { useState, useEffect } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "../components/LoadingIndicator";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [showSearches, setShowSearches] = useState(false);
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const getSearches = async (searchText) => {
    const response = await axios.get(
      `search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`
    );
    setSearches(response.data.results);
  };
  const handleResults = () => {
    if (searchText && searchText.length > 2) {
      setShowSearches(false);
      setLoading(true);
      getSearches(searchText);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setShowSearches(true);
    }
  };
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
          onSubmitEditing={handleResults}
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
      {showSearches == false ? (
        <Image
          source={require("../assets/images/movieTime.png")}
          style={{
            width: width,
            height: height * 0.55,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      ) : loading == true ? (
        <LoadingIndicator />
      ) : (
        <ScrollView horizontal={false}>
          <View className="mx-4">
            <Text className="text-white mb-2">Results({searches.length})</Text>
            <View className="flex-row flex-wrap justify-between">
              {/* <ScrollView horizontal={false}> */}
              {/* <FlatList
                  data={searches}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.id} // Assuming item has an 'id' property
                      onPress={() => {
                        navigation.navigate("MovieScreen", item);
                      }}
                    >
                      <View className="m-1">
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                          }}
                          style={{ height: height * 0.25, width: width * 0.4 }}
                          className="rounded-2xl"
                        />
                        <Text className="text-neutral-400 text-m">
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                /> */}
              {/* </ScrollView> */}
              {searches.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index} // Assuming item has an 'id' property
                    onPress={() => {
                      navigation.navigate("MovieScreen", item);
                    }}
                  >
                    <View className="m-1">
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                        }}
                        style={{ height: height * 0.25, width: width * 0.4 }}
                        className="rounded-2xl"
                      />
                      {item.title.length > 20 ? (
                        <Text className="text-neutral-400 text-m">
                          {item.title.slice(0, 20)}...
                        </Text>
                      ) : (
                        <Text className="text-neutral-400 text-m">
                          {item.title}
                        </Text>
                      )}
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
