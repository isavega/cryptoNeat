import React from 'react'
import { View, Image, Text, ScrollView } from 'react-native'
import { Button, Card } from '@rneui/themed'
import style from './styles'
import { useSelector } from 'react-redux'
import { dummyCryptoData } from '../../utils/constants'

const HomeScreen = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.user)

    return (
        <ScrollView style={style.scrollScreen}>
            <Text style={style.text}>
                Portafolio de {currentUser?.displayName}
            </Text>
            <Text style={style.textBalance}>$3,233 USD</Text>
            <View style={style.container}>
                {dummyCryptoData.map((crypto) => (
                    <Card
                        key={crypto.id}
                        containerStyle={style.cardContainer}
                        wrapperStyle={{}}
                    >
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
                                {crypto.amount}
                            </Text>
                            <Text style={style.priceCard}>
                                1 {crypto.value} = ${crypto.priceUSD} USD
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
