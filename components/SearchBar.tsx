import { icons } from "@/constants/icons";
import { View, Text, Image, TextInput } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string;
  onChangeText?: (text: string) => void;
}
const SearchBar = ({ onPress, placeholder, onChangeText, value }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200  rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5 "
        resizeMode="contain"
        tintColor="#ffffff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5d5"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
