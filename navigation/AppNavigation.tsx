import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppDrawer from './Drawer/Drawer'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import color from '../styles/colors'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const auth = useSelector((state) => state.auth)
    const { isAuthenticated } = auth

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
                {isAuthenticated ? (
                    <Stack.Group>
                        <Stack.Screen
                            name="Neat Cryptos"
                            component={AppDrawer}
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
