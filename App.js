import 'react-native-gesture-handler'
import { Text } from 'react-native'
import { useFonts } from 'expo-font'
import AppNavigation from './navigation/AppNavigation'
import store from './redux/store/store'
import { Provider } from 'react-redux'

const App = () => {
    const [fontsLoaded] = useFonts({
        PoppinsBold: require('./assets/fonts/PoppinsBold.ttf'),
        PoppinsRegular: require('./assets/fonts/PoppinsRegular.ttf'),
    })

    if (!fontsLoaded) {
        return <Text>Loading...</Text>
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    )
}

export default App
