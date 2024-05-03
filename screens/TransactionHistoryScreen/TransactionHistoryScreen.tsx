import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from '@rneui/themed'
import style from './styles'

const TransactionHistoryScreen = () => {
    const dummyData = [
        {
            date: '2021-06-01',
            amount: 0.1,
            crypto: 'BTC',
            type: 'Compra',
        },
        {
            date: '2021-06-02',
            amount: 0.2,
            crypto: 'ETH',
            type: 'Venta',
        },
        {
            date: '2021-06-03',
            amount: 0.3,
            crypto: 'USDT',
            type: 'Compra',
        },
        {
            date: '2021-06-04',
            amount: 0.4,
            crypto: 'DOGE',
            type: 'Venta',
        },
    ]
    return (
        <View style={style.screen}>
            {dummyData.map((item, index) => (
                <ListItem
                    key={index}
                    bottomDivider
                    containerStyle={{ width: 300 }}
                >
                    <ListItem.Content>
                        <ListItem.Title>{item.date}</ListItem.Title>
                        <ListItem.Subtitle>
                            {item.type} de {item.amount} {item.crypto}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}

export default TransactionHistoryScreen
