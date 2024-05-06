import React from 'react'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'
import RocketPro from '../../components/RocketPro/RocketPro'

const Rocket = ({ isAnimated }) => {
    const translateY = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            width: 300,
            height: 300,
            position: 'absolute',
            top: 150,
            padding: 10,
            margin: 10,
        }
    })

    if (isAnimated) {
        translateY.value = withTiming(-800, { duration: 3000 })
    } else {
        translateY.value = withTiming(0, { duration: 0 })
    }

    return (
        <Animated.View style={animatedStyle}>
            <RocketPro />
        </Animated.View>
    )
}

export default Rocket
