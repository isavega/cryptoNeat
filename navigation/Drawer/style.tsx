import { StyleSheet } from 'react-native'
import color from '../../styles/colors'

const style = StyleSheet.create({
    buttonLogOut: {
        container: {
            backgroundColor: color.feedback.error,
            padding: 10,
            margin: 10,
            marginTop: '80%',
            borderRadius: 5,
        },
        text: {
            color: color.white,
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'PoppinsRegular',
        },
    },
})

export default { ...style }
