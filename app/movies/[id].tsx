import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: number | string | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="mt-5 justify-center items-start flex-col">
    <Text className="text-light-300 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(
    () => fetchMovieDetails(id as string),
    true,
    false,
  );
  return (
    movie && (
      <View className="bg-primary flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}
`,
              }}
              className="w-full h-[550px]"
              resizeMode="cover"
            />
            <View className="flex-col items-start justify-center mt-5 px-5">
              <Text className="text-white font-bold text-xl">
                {movie?.title}
              </Text>
              <View className="flex-row gap-3 items-center space-x-5">
                <Text className="text-light-300 text-sm">
                  {movie?.release_date.split("-")[0]}
                </Text>
                <Text className="text-light-300  px-3 text-sm">
                  {movie?.runtime}m
                </Text>
              </View>
              <View className="mt-2 flex-row items-center bg-dark-200 px-2 py-1 rounded-md gap-x-1 ">
                <Image source={icons.star} className="size-5" />
                <Text className="text-white font-bold text-sm">
                  {movie?.vote_average.toFixed(1) || 0}
                </Text>
                <Text className="text-white font-bold text-sm">
                  ({movie?.vote_count.toLocaleString()} votes)
                </Text>
              </View>
              <MovieInfo label="Overview" value={movie?.overview} />
              <MovieInfo
                label="Genres"
                value={movie?.genres.map((g) => g.name).join(" , ") || "N/A"}
              />
              <View className="flex-row justify-between w-1/2">
                <MovieInfo
                  label="Budget"
                  value={`$${movie?.budget / 1_000_000} million`}
                />
                <MovieInfo
                  label="Revenue"
                  value={`$${Math.round(movie?.revenue) / 1_000_000} million`}
                />
              </View>
              <MovieInfo
                label={`Production  ${movie?.production_companies.length > 1 ? "companies" : "company"}`}
                value={movie?.production_companies
                  .map((p) => p.name)
                  .join(" , ")}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={router.back}
          className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 "
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180 "
            tintColor="#fff"
          />
          <Text className="text-white font-semibold text-base">GO back</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default MovieDetails;
