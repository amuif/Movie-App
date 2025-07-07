import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, Image, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://plachold.co/600x400/1a1a1a/ffffff.jpg",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text numberOfLines={1} className="text-xs mt-1 font-bold text-white">
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs uppercase font-bold text-white">
            {vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs uppercase  text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
