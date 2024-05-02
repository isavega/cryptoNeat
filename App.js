import { Text } from "react-native";
import { useFonts } from "expo-font";
import HomeScreen from "./screens/HomeScreen/HomeScreen.tsx";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/PoppinsBold.ttf"),
    PoppinsRegular: require("./assets/fonts/PoppinsRegular.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return <HomeScreen />;
}
