import { StyleSheet } from 'react-native'
import appStyle from '../../styles/appStyle'
import color from '../../styles/colors'

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '5%',
        marginBottom: 40,
    },
    cardContainer: {
        margin: '2%',
        width: '42%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: color.gray[200],
        marginBottom: 5,
    },
    image: {
        width: '50%',
        height: 40,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 10,
        color: color.white,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
    },
    textBalance: {
        marginTop: 10,
        color: color.white,
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
    },
    titleCard: {
        color: color.black,
        fontSize: 16,
        margin: 0,
        padding: 0,
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
    },

    balanceCard: {
        marginTop: 10,
        color: color.black,
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
    },
    priceCard: {
        marginTop: 5,
        color: color.black,
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
    },
    buttonContainer: {
        width: 300,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
    },
})

export default { ...appStyle, ...style }
