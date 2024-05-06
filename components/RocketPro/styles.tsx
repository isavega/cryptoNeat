import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    lottie: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        pointerEvents: 'none',
    },
})

export default { ...style }
