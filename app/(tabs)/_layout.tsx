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
        <ImageBackground
          source={images.highlight}
          className="flex flex-row gap-1 w-full flex-1 min-w-[100px] min-h-[65px] mt-4 rounded-full items-center justify-center overflow-hidden"
        >
          <Image source={icon} className="size-5" tintColor="#151312" />
          <Text className="text-secondary text-base ml-2">{title}</Text>
        </ImageBackground>
      );
    }
    return (
      <View className="size-full items-center justify-center rounded-full">
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
          justifyContent: "center",
          alignContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
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
      <Tabs.Screen
        name="Saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Person" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
