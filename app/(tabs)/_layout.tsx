import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { Tabs } from "expo-router";
import { View, Text, ImageBackground, Image } from "react-native";

const _layout = () => {
  const TabIcon = ({
    title,
    icon,
    focused,
  }: {
    title: string;
    icon: any;
    focused: boolean;
  }) => {
    if (focused) {
      return (
        <View className="flex bg-white flex-row gap-1 w-full flex-1 min-w-[150px] min-h-[65px] mt-4  items-center justify-center overflow-hidden">
          <Image source={icon} className="size-5" tintColor="#000" />
          <Text className="text-black text-base ml-2">{title}</Text>
        </View>
      );
    }
    return (
      <View className="size-full items-center justify-center ">
        <Image source={icon} tintColor="#A8B5DB" className="size-5" />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignContent: "space-between",
          borderRadius: 60,
        },
        tabBarStyle: {
          backgroundColor: "#000",
          height: 52,
          position: "absolute",
          overflow: "hidden",
          marginBottom: 20,
          marginHorizontal: 40,
          borderRadius: 60,
          borderColor: "0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
