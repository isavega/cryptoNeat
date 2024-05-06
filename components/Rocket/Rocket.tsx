import React, { useState } from 'react'
import { View, Image, Button } from 'react-native'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated'

const IMAGE = '../../assets/rocket.png'

const Rocket = ({ isAnimated }) => {
    const translateY = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value,
                },
                {
                    translateX: translateY.value * -0.5,
                },
            ],
            width: 100,
            height: 100,
            position: 'absolute',
            top: 100,
        }
    })

    if (isAnimated) {
        translateY.value = withTiming(-300, { duration: 1000 })
    } else {
        translateY.value = withTiming(0, { duration: 0 })
    }

    return (
        <Animated.View style={animatedStyle}>
            <Image
                source={require(IMAGE)}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </Animated.View>
    )
}

const AnimatedRocket = () => {
    const [isAnimated, setIsAnimated] = useState(false)

    return (
        <View>
            <Rocket isAnimated={isAnimated} />
            <Button
                title="Launch Rocket"
                onPress={() => setIsAnimated(!isAnimated)}
            />
        </View>
    )
}

export default AnimatedRocket
