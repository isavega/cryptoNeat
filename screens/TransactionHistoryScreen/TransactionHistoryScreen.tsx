import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from '@rneui/themed'
import style from './styles'
import { BUY } from '../../utils/constants'
import { formatDateTime } from '../../utils/utils'
import { getDatabase, ref, onValue, DataSnapshot } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Transaction } from '../../models'

const TransactionHistoryScreen: React.FC = () => {
    const currentUser = useSelector((state: any) => state.user.user)
    const [transactionData, setTransactionData] = useState<Transaction[]>([])

    const readTransactionUserData = (userId: string) => {
        const db = getDatabase()
        const starCountRef = ref(db, 'transactions/' + userId)
        onValue(starCountRef, (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                setTransactionData(Object.values(data))
            }
        })
    }

    useEffect(() => {
        readTransactionUserData(currentUser.uid)
    }, [currentUser.uid])

    return (
        <ScrollView style={style.scrollScreen}>
            {transactionData?.map((item: Transaction, index: number) => (
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
                            {item.operationType === BUY
                                ? `Compra de $${item.amount} USD en ${item.crypto}`
                                : `Venta de ${item.amount} ${item.crypto}`}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            ))}
        </ScrollView>
    )
}

export default TransactionHistoryScreen
