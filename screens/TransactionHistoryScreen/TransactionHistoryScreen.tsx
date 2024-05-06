import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from '@rneui/themed'
import style from './styles'
import { BUY, transactionTypeMap } from '../../utils/constants'
import { formatDateTime } from '../../utils/utils'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useSelector } from 'react-redux'

const TransactionHistoryScreen = () => {
    const currentUser = useSelector((state) => state.user.user)
    const [transactionData, setTransactionData] = useState([])

    const readTransactionUserData = (userId) => {
        const db = getDatabase()
        const starCountRef = ref(db, 'transactions/' + userId)
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            setTransactionData(Object.values(data))
        })
    }

    useEffect(() => {
        readTransactionUserData(currentUser.uid)
    }, [])

    return (
        <ScrollView style={style.scrollScreen}>
            {transactionData?.map((item, index) => (
                <ListItem
                    key={index}
                    bottomDivider
                    containerStyle={style.itemContainer}
                >
                    <ListItem.Content>
                        <ListItem.Title style={style.itemDate}>
                            {formatDateTime(item.date)}
                        </ListItem.Title>
                        <ListItem.Subtitle
                            style={
                                item.operationType === BUY
                                    ? style.itemBuy
                                    : style.itemSell
                            }
                        >
                            {transactionTypeMap[item.operationType]} de{' '}
                            {item.amount} {item.crypto}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </ScrollView>
    )
}

export default TransactionHistoryScreen
