import { icons } from "../../constants/icons";
import MovieCard from "../../components/MovieCard";
import { images } from "../../constants/images";
import { fetchMovies } from "../../services/api";
import useFetch from "../../services/useFetch";
import { FlatList, View, Text, Image, ActivityIndicator } from "react-native";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { updateSearchCount } from "../../services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    reset,
    refetch,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);
  return (
    <View className="bg-primary flex-1 ">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20  items-center">
              <Image source={icons.logo} className="w-12 h-10  mb-5" />
            </View>
            <View className="my-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search movies..."
              />
            </View>
            {loading && (
              <ActivityIndicator
                color="#0000ff"
                size="large"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 my-3 px-5">
                Error loading movie: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white font-bold text-base">
                Search results for{" "}
                <Text className="text-acccent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10  px-5">
              <Text className="text-center text-gray-500 ">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
