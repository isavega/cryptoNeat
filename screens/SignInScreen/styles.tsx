import { StyleSheet } from 'react-native'
import appStyle from '../../styles/appStyle'
import color from '../../styles/colors'

const style = StyleSheet.create({
    container: {
        padding: 25,
        marginTop: '8%',
    },
    title: {
        padding: 10,
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        color: color.white,
    },

    inputContainer: {
        backgroundColor: color.gray[200],
        height: 50,
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },

    inputText: {
        color: color.information.text,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
    },

    image: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
    },
})

export default { ...appStyle, ...style }
