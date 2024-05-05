import { StyleSheet } from 'react-native'
import appStyle from '../../styles/appStyle'
import color from '../../styles/colors'

const style = StyleSheet.create({
    formContainer: {
        width: '80%',
        position: 'absolute',
        top: '10%',
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    inputText: {
        color: color.white,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'PoppinsRegular',
    },
    inputTextReadOnly: {
        color: color.feedback.success,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'PoppinsRegular',
    },
    switchContainer: {
        marginBottom: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    switchText: {
        color: color.white,
        fontSize: 16,
        marginRight: 15,
        fontFamily: 'PoppinsRegular',
    },
})

export default { ...appStyle, ...style }
