import { StyleSheet } from 'react-native'
import appStyle from '../../styles/appStyle'
import color from '../../styles/colors'

const style = StyleSheet.create({
    itemContainer: {
        marginTop: '5%',
        backgroundColor: 'transparent',
        width: '100%',
    },
    itemDate: {
        color: color.white,
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
    },
    itemBuy: {
        color: color.feedback.error,
        fontSize: 12,
        fontFamily: 'PoppinsRegular',
    },
    itemSell: {
        color: color.feedback.success,
        fontSize: 12,
        fontFamily: 'PoppinsRegular',
    },
})

export default { ...appStyle, ...style }
