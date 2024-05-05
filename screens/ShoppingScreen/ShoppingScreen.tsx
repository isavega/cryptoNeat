import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import style from './styles'
import Dropdown from 'react-native-input-select'
import color from '../../styles/colors'
import { dummyCryptoData } from '../../utils/constants'
import { useSelector } from 'react-redux'
import { formatToUSD, generateRandomSuccessRate } from '../../utils/utils'
import { getDatabase, push, ref, set, update } from 'firebase/database'
import { BUY } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { updateBalance } from '../../redux/slice/userSlice'

const ShoppingScreen = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.user)
    const dispatch = useDispatch()

    const [crypto, setCrypto] = useState('')
    const [amount, setAmount] = useState('')
    const [equivalentUSD, setEquivalentUSD] = useState('')

    const isDisabled = !crypto || !amount || amount > currentUser.balanceUSD

    const handleAmountChange = (value) => {
        setAmount(value)

        const selectedCrypto = dummyCryptoData.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentUSD(
            `$ ${Number(value) / Number(selectedCrypto?.priceUSD)} ${
                selectedCrypto?.value
            }`
        )
    }

    const writeTransactionData = (
        userId,
        crypto,
        amount,
        operationType,
        date
    ) => {
        const db = getDatabase()
        const newTransactionRef = ref(db, 'transactions/' + userId)
        push(newTransactionRef, {
            crypto,
            amount,
            operationType,
            date,
        })
    }

    const updateUserData = (userId, balance) => {
        const db = getDatabase()
        update(ref(db, 'users/' + userId), {
            balanceUSD: balance,
        })
    }

    const handleBuy = () => {
        const isSuccessful = generateRandomSuccessRate()
        if (isSuccessful) {
            console.log('Compra exitosa')
            const newBalance = currentUser.balanceUSD - Number(amount)
            writeTransactionData(
                currentUser.uid,
                crypto,
                amount,
                BUY,
                new Date().toISOString()
            )
            updateUserData(currentUser.uid, newBalance)
            dispatch(updateBalance(newBalance))
            navigation.navigate('Home')
        } else {
            console.log('Compra fallida')
        }
    }

    return (
        <View style={style.screen}>
            <View style={style.formContainer}>
                <Text style={style.text}>Saldo disponible</Text>
                <Text style={style.textBalance}>
                    {' '}
                    ${formatToUSD(currentUser.balanceUSD)} USD
                </Text>
                <Dropdown
                    placeholder="Selecciona una crypto"
                    options={dummyCryptoData}
                    selectedValue={crypto}
                    onValueChange={(value) => {
                        setCrypto(value)
                    }}
                    primaryColor={color.information.primary}
                />

                <Input
                    value={amount}
                    onChangeText={handleAmountChange}
                    placeholder="Cantidad de USD"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                    keyboardType="numeric"
                />
                <Input
                    value={equivalentUSD}
                    placeholder={`Equivalente en ${crypto} aproximado`}
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputTextReadOnly}
                    readOnly
                />

                <Button
                    title="Comprar"
                    type="outline"
                    disabled={isDisabled}
                    onPress={handleBuy}
                    buttonStyle={
                        isDisabled
                            ? style.buttonContainerDisabled
                            : style.buttonContainer
                    }
                    titleStyle={style.buttonText}
                />
            </View>
        </View>
    )
}

export default ShoppingScreen
