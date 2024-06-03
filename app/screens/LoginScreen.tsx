import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
  EBGaramond_700Bold,
  EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";

export default function LoginScreen() {
  let [fontsLoaded, fontError] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    EBGaramond_800ExtraBold,
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }
      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }
      console.error(error);
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="grow"
    >
      <SafeAreaView className="grow bg-[#FDEED7]">
        <Text
          style={{ fontFamily: "EBGaramond_700Bold" }}
          className="text-center text-6xl mt-[50]"
        >
          Bouquine
        </Text>
        <Image source={require("../../assets/images/bouquine_logo.png")} />
        <View className="justify-between gap-[25]">
          <View>
            <Text
              style={{ fontFamily: "EBGaramond_600SemiBold" }}
              className="ml-[40] text-2xl"
            >
              Email
            </Text>
            <TextInput
              className="bg-white rounded-lg mx-[30] p-[10]"
              style={{ fontFamily: "EBGaramond_600SemiBold", fontSize: 20 }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#c2c2c2"
            />
          </View>
          <View>
            <Text
              style={{ fontFamily: "EBGaramond_600SemiBold" }}
              className="ml-[40] text-2xl"
            >
              Mot de Passe
            </Text>

            <TextInput
              className="bg-white rounded-lg mx-[30] p-[10]"
              style={{ fontFamily: "EBGaramond_600SemiBold", fontSize: 20 }}
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              placeholderTextColor="#c2c2c2"
            />
          </View>
        </View>
        <Pressable
          className="bg-[#334832] rounded-lg mx-[30] p-2 mt-[50]"
          onPress={handleSignUp}
        >
          <Text
            style={{ fontFamily: "EBGaramond_600SemiBold" }}
            className="text-[#FDEED7] text-center text-3xl"
          >
            Se connecter
          </Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
