import { StyleSheet } from 'react-native'
import color from './colors'

const appStyle = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.app.background,
    },
    scrollScreen: {
        backgroundColor: color.app.background,
    },

    androidHeader: {
        backgroundColor: color.information.highlight,
        height: 60,
        padding: 10,
    },

    iosHeader: {
        backgroundColor: color.information.highlight,
        height: 100,
        padding: 10,
    },

    title: {
        fontSize: 25,
        color: color.information.text,
        fontFamily: 'PoppinsBold',
    },
    paragraph: {
        fontSize: 16,
        color: color.information.text,
        fontFamily: 'PoppinsRegular',
    },

    buttonContainer: {
        backgroundColor: color.information.primary,
        padding: 10,
        margin: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: color.white,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
    },
    buttonContainerDisabled: {
        backgroundColor: color.darkBlue[700],
        padding: 10,
        margin: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
})

export default appStyle
