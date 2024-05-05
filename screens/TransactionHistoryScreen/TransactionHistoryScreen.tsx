import React from 'react'
import { View, ScrollView } from 'react-native'
import { ListItem } from '@rneui/themed'
import style from './styles'
import {
    dummyTransactionData,
    BUY,
    transactionTypeMap,
} from '../../utils/constants'

const TransactionHistoryScreen = () => {
    return (
        <ScrollView style={style.scrollScreen}>
            {dummyTransactionData.map((item, index) => (
                <ListItem
                    key={index}
                    bottomDivider
                    containerStyle={style.itemContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={style.itemDate}>
                            {item.date}
                        </ListItem.Title>
                        <ListItem.Subtitle
                            style={
                                item.type === BUY
                                    ? style.itemBuy
                                    : style.itemSell
                            }
                        >
                            {transactionTypeMap[item.type]} de {item.amount}{' '}
                            {item.crypto}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </ScrollView>
    )
}

export default TransactionHistoryScreen
