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
import { FlatList } from "react-native-gesture-handler";
import LoadingIndicator from "../components/LoadingIndicator";

const { width, height } = Dimensions.get("window");
export default function MovieScreen(props) {
  const item = props.route.params;
  const id = props.route.params.id;
  const navigation = useNavigation();
  const [favourite, setFavourite] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [genreName, setGenreName] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDetails();
    getSimilarMovies();
    getMovieCast();
    getGenreName();
    
  }, [item]);
  const getDetails = async () => {
    const response = await axios.get(`movie/${id}?language=en-US`);
    setMovieDetails(response.data);
  };
  const getSimilarMovies = async () => {
    const response = await axios.get(`movie/${id}/similar`);
    setSimilarMovies(response.data);
  };
  const getMovieCast = async () => {
    const response = await axios.get(`movie/${id}/credits`);
    setMovieCast(response.data);
    setLoading(false);
  };
  const getGenreName = async () => {
    const response = await axios.get(`genre/movie/list?language=en`);
    setGenreName(response.data);
  };

  return loading == false ? (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View className="w-full">
        <SafeAreaView
          className="absolute z-20 flex-row w-full justify-between pr-5"
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

        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={{
              height: height * 0.51,
              width: width,
            }}
          />
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text
            className="tracking-wider"
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: "gray",
              fontWeight: 500,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            {movieDetails?.status} • {movieDetails?.release_date?.slice(0, 4)} •{" "}
            {movieDetails?.runtime} min
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} horizontal={true}>
            <Text
              style={{
                color: "gray",
                fontWeight: 500,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Drama • Action • Comedy • Horror
            </Text>
          </ScrollView>

          {/* description */}
          <Text
            style={{
              color: "white",
              marginLeft: 10,
              marginRight: 10,
              color: "gray",
            }}
          >
            {item.overview}
          </Text>

          {/* Top cast */}
          <Text
            style={{
              color: "white",
              marginTop: 10,
              fontWeight: 500,
            }}
          >
            Top Cast
          </Text>
          <ScrollView>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={movieCast.cast}
              renderItem={({ item }) => <CastCard item={item} />}
            />
          </ScrollView>

          {/* Similar Movies */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <MoviesList
              data={similarMovies.results}
              title="Similar Movies"
              seeAll={false}
            />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  ) : (
    <LoadingIndicator />
  );
}
