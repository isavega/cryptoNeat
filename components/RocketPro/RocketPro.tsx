import LottieView from 'lottie-react-native'
import { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'

const RocketPro = () => {
    const rocketRef = useRef<LottieView>(null)

    function triggerrocket() {
        rocketRef.current?.play(0)
    }

    useEffect(() => {
        triggerrocket()
    }, [])

    return (
        <>
            <LottieView
                ref={rocketRef}
                source={require('../../assets/rocket.json')}
                autoPlay={false}
                loop={false}
                style={styles.lottie}
                resizeMode="cover"
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

export default RocketPro
