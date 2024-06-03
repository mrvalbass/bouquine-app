import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  // if (initializing) return null;

  return user ? <HomeScreen /> : <LoginScreen />;
}
