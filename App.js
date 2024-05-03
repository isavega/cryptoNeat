import "react-native-gesture-handler";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import AppNavigation from "./navigation/AppNavigation";

const App = () => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/PoppinsBold.ttf"),
    PoppinsRegular: require("./assets/fonts/PoppinsRegular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const isLoggedIn = true;

  return <AppNavigation isLoggedIn={isLoggedIn} />;
};

export default App;
