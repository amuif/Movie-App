import { useRouter } from "expo-router";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import {
  ActivityIndicator,
  Text,
  Image,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";
import MovieCard from "../../components/MovieCard";
import { getTrendingMovies } from "../../services/appwrite";
import { useEffect } from "react";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies, true, false);
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  useEffect(() => {
    console.warn(trendingMovies);
  }, [trendingMovies]);
  return (
    <View className="flex-1 bg-primary h-full">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10  mx-auto mt-20 mb-5" />
        {loading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#000ff"
            className="mt-10  self-center"
          />
        ) : error || trendingError ? (
          <Text>Error:{error?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              value=""
              onPress={() => {
                router.push("/Search");
              }}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg mb-3 font-bold text-white">
                  Trending movies
                </Text>
              </View>
            )}

            <>
              <FlatList
                data={trendingMovies}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
              <Text className="text-white font-bold my-5 text-lg">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 mb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
