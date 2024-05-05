import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer'
import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import TransactionHistoryScreen from '../../screens/TransactionHistoryScreen/TransactionHistoryScreen'
import SalesScreen from '../../screens/SalesScreen/SalesScreen'
import ShoppingScreen from '../../screens/ShoppingScreen/ShoppingScreen'
import color from '../../styles/colors'
import { Button } from '@rneui/themed'
import style from './style'
import { logOut } from '../../redux/slice/userSlice'
import { useDispatch } from 'react-redux'

const Drawer = createDrawerNavigator()

const Logout = () => {
    const dispatch = useDispatch()

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <Button
            title="Cerrar Sesión"
            buttonStyle={style.buttonLogOutContainer}
            titleStyle={style.buttonLogOutText}
            onPress={logOutHandler}
        />
    )
}

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Logout />
    </DrawerContentScrollView>
)

const AppDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: `${color.app.background}`,
                },
                headerTintColor: color.white,
                headerTitleStyle: {
                    fontFamily: 'PoppinsRegular',
                },
                headerShadowVisible: false,
                drawerActiveBackgroundColor: color.app.background,
                drawerActiveTintColor: color.white,
                drawerInactiveBackgroundColor: color.white,
                drawerAllowFontScaling: true,
                drawerStyle: {
                    backgroundColor: color.information.background,
                },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />

            <Drawer.Screen
                name="Sales"
                component={SalesScreen}
                options={{
                    title: 'Vender Cryptos',
                }}
            />
            <Drawer.Screen
                name="Shopping"
                component={ShoppingScreen}
                options={{
                    title: 'Comprar Cryptos',
                }}
            />
            <Drawer.Screen
                name="Transactions"
                component={TransactionHistoryScreen}
                options={{
                    title: 'Historial',
                }}
            />
        </Drawer.Navigator>
    )
}

export default AppDrawer
