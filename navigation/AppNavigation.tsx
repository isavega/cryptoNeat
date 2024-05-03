import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppDrawer from './Drawer/Drawer'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import SalesScreen from '../screens/SalesScreen/SalesScreen'
import ShoppingScreen from '../screens/ShoppingScreen/ShoppingScreen'
import color from '../styles/colors'

const Stack = createNativeStackNavigator()

const AppNavigation = (isLoggedIn: Boolean) => {
    // const { isLoggedIn } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: `${color.app.background}`,
                    },
                    headerTintColor: color.white,
                    headerTitleStyle: {
                        fontFamily: 'PoppinsBold',
                    },
                }}
            >
                {isLoggedIn ? (
                    <Stack.Group>
                        <Stack.Screen
                            name="Neat Cryptos"
                            component={AppDrawer}
                        />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Sales" component={SalesScreen} />
                        <Stack.Screen
                            name="Shopping"
                            component={ShoppingScreen}
                        />
                    </Stack.Group>
                ) : (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation
