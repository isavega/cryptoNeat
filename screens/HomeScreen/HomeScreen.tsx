import React from 'react'
import { View, Image, Text } from 'react-native'
import { Button, Card } from '@rneui/themed'
import style from './styles'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()
    const dummyCryptoData = [
        {
            id: 1,
            name: 'Bitcoin',
            priceUSD: '10000',
            image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        },
        {
            id: 2,
            name: 'Ethereum',
            priceUSD: '10000',
            image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        },
        {
            id: 3,
            name: 'Theter',
            priceUSD: '10000',
            image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        },
        {
            id: 4,
            name: 'Dogecoin',

            priceUSD: '10000',
            image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        },
    ]

    return (
        <View style={style.screen}>
            <Text style={style.title}>Valor Portafolio USD: $3,233</Text>
            <Text style={style.title}>Cryptos favoritas</Text>
            <View style={style.container}>
                {dummyCryptoData.map((crypto) => (
                    <Card
                        key={crypto.id}
                        containerStyle={style.cardContainer}
                        wrapperStyle={{}}
                    >
                        <Card.Title>{crypto.name}</Card.Title>
                        <Card.Divider />
                        <View
                            style={{
                                position: 'relative',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={{ width: '50%', height: 50 }}
                                resizeMode="contain"
                                source={{
                                    uri: `${crypto.image}`,
                                }}
                            />
                            <Text>{crypto.price}</Text>
                            <Text>{crypto.price}</Text>
                        </View>
                    </Card>
                ))}
            </View>

            <View style={style.buttonGroupContainer}>
                <Button
                    title="Comprar"
                    type="outline"
                    buttonStyle={style.button.container}
                    titleStyle={style.button.text}
                    onPress={() => navigation.navigate('Shopping')}
                />
                <Button
                    title="Vender"
                    type="outline"
                    buttonStyle={style.button.container}
                    titleStyle={style.button.text}
                    onPress={() => navigation.navigate('Sales')}
                />
            </View>
        </View>
    )
}

export default HomeScreen
