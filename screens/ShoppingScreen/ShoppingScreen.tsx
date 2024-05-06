import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import style from './styles'
import Dropdown from 'react-native-input-select'
import color from '../../styles/colors'
import { useSelector } from 'react-redux'
import { formatToUSD, generateRandomSuccessRate } from '../../utils/utils'
import { BUY } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { updateBalance } from '../../redux/slice/userSlice'
import { updateCryptoPortfolio } from '../../redux/slice/cryptoSlice'
import {
    writeTransactionData,
    updateUserData,
} from '../../services/realtimeDatabase'

const ShoppingScreen = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.user)
    const cryptoPortfolio = useSelector((state) => state.crypto.cryptoPortfolio)
    const dispatch = useDispatch()

    const [crypto, setCrypto] = useState('')
    const [amount, setAmount] = useState('')
    const [equivalentCrypto, setEquivalentCrypto] = useState('')

    const isDisabled = !crypto || !amount || amount > currentUser.balanceUSD

    const handleAmountChange = (value) => {
        setAmount(value)

        const selectedCrypto = cryptoPortfolio.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentCrypto(
            `$ ${Number(value) / Number(selectedCrypto?.priceUSD)} ${
                selectedCrypto?.value
            }`
        )
    }

    const handleBuy = () => {
        const isSuccessful = generateRandomSuccessRate()
        if (isSuccessful) {
            console.log('Compra exitosa')
            const newBalance = currentUser.balanceUSD - Number(amount)
            const selectedCrypto = cryptoPortfolio.find(
                (cryptoObj) => cryptoObj.value === crypto
            )
            writeTransactionData(
                currentUser.uid,
                crypto,
                amount,
                BUY,
                new Date().toISOString()
            )
            updateUserData(currentUser.uid, newBalance)
            dispatch(updateBalance(newBalance))
            dispatch(
                updateCryptoPortfolio(
                    cryptoPortfolio.map((cryptoObj) => {
                        if (cryptoObj.value === crypto) {
                            return {
                                ...cryptoObj,
                                amount: (
                                    Number(cryptoObj.amount) +
                                    Number(amount) /
                                        Number(selectedCrypto?.priceUSD)
                                ).toFixed(8),
                            }
                        }
                        return cryptoObj
                    })
                )
            )
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
                    options={cryptoPortfolio}
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
                    readOnly={!crypto}
                />
                <Input
                    value={equivalentCrypto}
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
