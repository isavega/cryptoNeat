import React from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import { Button, Card } from '@rneui/themed'
import style from './styles'
import { useSelector } from 'react-redux'
import { formatToUSD } from '../../utils/utils'
import { RootState, Navigation, Crypto } from '../../models'

const HomeScreen: React.FC<{ navigation: Navigation }> = ({ navigation }) => {
    const currentUser = useSelector((state: RootState) => state.user.user)
    const cryptoPortfolio = useSelector(
        (state: RootState) => state.crypto.cryptoPortfolio
    )

    return (
        <ScrollView style={style.scrollScreen}>
            <Text style={style.text}>
                Portafolio de {currentUser?.username}
            </Text>
            <Text style={style.textBalance}>
                ${formatToUSD(currentUser?.balanceUSD)} USD
            </Text>
            <View style={style.container}>
                {cryptoPortfolio?.map((crypto: Crypto) => (
                    <Card key={crypto.id} containerStyle={style.cardContainer}>
                        <Card.Title style={style.titleCard}>
                            {crypto.label}
                        </Card.Title>
                        <Card.Divider />
                        <View
                            style={{
                                position: 'relative',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={style.image}
                                resizeMode="contain"
                                source={{
                                    uri: `${crypto.image}`,
                                }}
                            />
                            <Text style={style.balanceCard}>
                                {crypto?.amount}
                            </Text>
                            <Text style={style.priceCard}>
                                1 {crypto.value} = ${crypto?.priceUSD} USD
                            </Text>
                        </View>
                    </Card>
                ))}

                <Button
                    title="Comprar"
                    type="outline"
                    buttonStyle={style.buttonContainer}
                    titleStyle={style.buttonText}
                    onPress={() => navigation.navigate('Shopping')}
                />
                <Button
                    title="Vender"
                    type="outline"
                    buttonStyle={style.buttonContainer}
                    titleStyle={style.buttonText}
                    onPress={() => navigation.navigate('Sales')}
                />
            </View>
        </ScrollView>
    )
}

export default HomeScreen
