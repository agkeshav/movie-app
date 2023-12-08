import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import CastCard from "../components/CastCard";
import MoviesList from "../components/MoviesList";
import axios from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";

const { width, height } = Dimensions.get("window");
export default function MovieScreen(props) {
  let data = props.route.params;

  const navigation = useNavigation();
  const [favourite, setFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, [data, personDetails]);
  const getPersonDetails = async () => {
    const response = await axios.get(`person/${data.id}?language=en-US`);
    setPersonDetails(response.data);
  };
  const getPersonMovies = async () => {
    const response = await axios.get(
      `person/${data.id}/movie_credits?language=en-US`
    );
    setPersonMovies(response.data);
    setLoading(false);
  };
  // console.log(personMovies);
  return loading == false ? (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View className="w-full">
        <SafeAreaView
          className="flex-row w-full justify-between pr-5"
          style={{ marginTop: 40, marginLeft: 10 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#eab308",
              borderRadius: 8,
              marginLeft: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon color={"white"} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavourite(!favourite)}>
            {!favourite ? (
              <HeartIcon color={"white"} size={30} />
            ) : (
              <HeartIcon color={"red"} size={30} />
            )}
          </TouchableOpacity>
        </SafeAreaView>

        {/*Person details*/}

        <View className="flex-col">
          <View
            style={{
              marginTop: height * 0.05,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data.profile_path}`,
              }}
              className="rounded-full overflow-hidden"
              style={{
                height: height * 0.4,
                width: width * 0.8,
                borderColor: "white",
                borderWidth: 2,
              }}
            />
          </View>

          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Text
              className="text-neutral-300 font-bold "
              style={{ fontSize: 25 }}
            >
              {data.name}
            </Text>
            <Text className="text-neutral-500 " style={{ fontSize: 15 }}>
              {personDetails.place_of_birth}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 20,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              padding: 7,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
            className="bg-neutral-700"
          >
            <View>
              <Text className="text-neutral-200">Gender</Text>
              {personDetails.gender == 2 ? (
                <Text className="text-neutral-300">Male</Text>
              ) : (
                <Text className="text-neutral-300">Female</Text>
              )}
            </View>
            <View>
              <Text className="text-neutral-200">Birthday</Text>
              <Text className="text-neutral-300">{personDetails.birthday}</Text>
            </View>
            <View>
              <Text className="text-neutral-200">Known For</Text>
              <Text className="text-neutral-300">
                {personDetails.known_for_department}
              </Text>
            </View>
            <View>
              <Text className="text-neutral-200">Popularity</Text>
              <Text className="text-neutral-300">
                {personDetails.popularity}%
              </Text>
            </View>
          </View>
          <View className="ml-4 mt-2">
            {personDetails.biography && (
              <>
                <Text className="text-white font-bold">Biography</Text>
                {personDetails.biography.length > 1000 ? (
                  <Text className="text-neutral-300">
                    {personDetails.biography.slice(0, 1000)}...
                  </Text>
                ) : (
                  <Text className="text-neutral-300">
                    {personDetails.biography}
                  </Text>
                )}
              </>
            )}
          </View>
          <MoviesList data={personMovies.cast} title="Movies" seeAll={false} />
        </View>
      </View>
    </ScrollView>
  ) : (
    <LoadingIndicator />
  );
}
