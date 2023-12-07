import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Text, View } from "react-native";
import TrendingMoviesCarousel from "../components/TrendingMoviesCarousel";
import { Bars3BottomLeftIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList";
import { useNavigation } from "@react-navigation/native";
import axios from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [trending, setTrending] = useState();
  const [upcoming, setUpcoming] = useState();
  const [topRated, setTopRated] = useState();
  const [loading, setLoading] = useState(true);
  const getTopRated = async () => {
    const response = await axios.get("movie/top_rated?language=en-US&page=1");
    setTopRated(response.data.results);
  };
  const getUpcoming = async () => {
    const response = await axios.get("movie/upcoming?language=en-US&page=1");
    setUpcoming(response.data.results);
  };
  const getTrending = async () => {
    const response = await axios.get("trending/movie/day?language=en-US");
    setTrending(response.data.results);
    setLoading(false);
  };
  useEffect(() => {
    getTopRated();
    getUpcoming();
    getTrending();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className="mb-3 mx-4">
        {/* {status bar} */}
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mt-10">
          <Bars3BottomLeftIcon color={"white"} size={30} strokeWidth={2} />
          {/* {Logo} */}
          <Text className="text-white text-2xl font-bold">
            <Text style={styles.textStyle}>M</Text>ovies
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SearchScreen");
            }}
          >
            <MagnifyingGlassIcon color={"white"} size={30} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading==false ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* {TrendingMoviesCarousel} */}
          <TrendingMoviesCarousel data={trending} />

          {/* {UpcomingMovies} */}
          <MoviesList data={upcoming} title="Upcoming" seeAll={true} />

          {/* {Top rated Movies} */}
          <MoviesList data={topRated} title="Top Rated" seeAll={true} />
        </ScrollView>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: "#eab308",
  },
});
