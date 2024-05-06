import LottieView from 'lottie-react-native'
import { useEffect, useRef } from 'react'
import style from './styles'

const RocketPro: React.FC = () => {
    const rocketRef = useRef<LottieView>(null)

    const triggerRocket = () => {
        rocketRef.current?.play(0)
    }

    useEffect(() => {
        triggerRocket()
    }, [])

    return (
        <>
            <LottieView
                ref={rocketRef}
                source={require('../../assets/rocket.json')}
                autoPlay={false}
                loop={false}
                style={style.lottie}
                resizeMode="cover"
            />
        </>
    )
}

export default RocketPro
