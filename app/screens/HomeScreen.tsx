import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
  EBGaramond_700Bold,
  EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

const handleSignOut = async () => {
  await auth().signOut();
};

const FirstRoute = () => (
  <View className="grow bg-[#FDEED7] justify-center items-center">
    <Pressable className="p-5 border-2" onPress={handleSignOut}>
      <Text>Déconnexion</Text>
    </Pressable>
  </View>
);

const SecondRoute = () => <View className="grow bg-[#FDEED7]" />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function HomeScreen() {
  let [fontsLoaded, fontError] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    EBGaramond_800ExtraBold,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Mes Livres" },
    { key: "second", title: "A Lire" },
  ]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView className="grow bg-[#FDEED7] ">
      <StatusBar style="dark" />
      <Text
        style={{ fontFamily: "EBGaramond_600SemiBold" }}
        className="text-3xl p-5"
      >
        Bonjour, utilisateur
      </Text>
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            className="bg-[#FDEED7]"
            renderLabel={({ route }) => (
              <Text
                style={{ fontFamily: "EBGaramond_500Medium" }}
                className="text-xl"
              >
                {route.title}
              </Text>
            )}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}
