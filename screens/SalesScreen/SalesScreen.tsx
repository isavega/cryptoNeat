import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input, Switch } from '@rneui/themed'
import style from './styles'
import color from '../../styles/colors'
import Dropdown from 'react-native-input-select'
import { useSelector } from 'react-redux'
import { generateRandomSuccessRate } from '../../utils/utils'
import { SELL } from '../../utils/constants'
import { useDispatch } from 'react-redux'
import { updateBalance } from '../../redux/slice/userSlice'
import { updateCryptoPortfolio } from '../../redux/slice/cryptoSlice'
import {
    writeTransactionData,
    updateUserData,
} from '../../services/realtimeDatabase'

const SalesScreen = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.user)
    const cryptoPortfolio = useSelector((state) => state.crypto.cryptoPortfolio)
    const dispatch = useDispatch()
    const [sellAllCrypto, setSellAllCrypto] = useState(true)
    const [crypto, setCrypto] = useState('')
    const [amount, setAmount] = useState('')
    const [equivalentUSD, setEquivalentUSD] = useState('')

    const handleCryptoChange = (value) => {
        const selectedCrypto = cryptoPortfolio.find(
            (crypto) => crypto.value === value
        )

        setCrypto(value)
        setAmount(selectedCrypto?.amount.toString())
        setEquivalentUSD(
            `$ ${(
                Number(selectedCrypto?.amount) *
                Number(selectedCrypto?.priceUSD)
            ).toFixed(2)} USD`
        )
    }

    const handleAmountChange = (value) => {
        setAmount(value)

        const selectedCrypto = cryptoPortfolio.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentUSD(
            `$ ${(Number(value) * Number(selectedCrypto?.priceUSD)).toFixed(
                2
            )} USD`
        )
    }

    const handleSwitchChange = () => {
        setSellAllCrypto(!sellAllCrypto)

        setAmount(
            sellAllCrypto
                ? ''
                : cryptoPortfolio.find((crypto) => crypto === crypto).amount
        )
        setEquivalentUSD(
            sellAllCrypto
                ? ''
                : `$ ${(
                      Number(
                          cryptoPortfolio.find(
                              (cryptoObj) => cryptoObj.value === crypto
                          ).amount
                      ) *
                      Number(
                          cryptoPortfolio.find(
                              (cryptoObj) => cryptoObj.value === crypto
                          ).priceUSD
                      )
                  ).toFixed(2)} USD`
        )
    }

    const isDisabled =
        !crypto ||
        !amount ||
        amount >
            cryptoPortfolio.find((cryptoObj) => cryptoObj.value === crypto)
                .amount

    const handleSell = () => {
        const isSuccessful = generateRandomSuccessRate()
        if (isSuccessful) {
            console.log('Venta exitosa')
            const selectedCrypto = cryptoPortfolio.find(
                (cryptoObj) => cryptoObj.value === crypto
            )
            const newBalance =
                currentUser.balanceUSD +
                Number(selectedCrypto?.amount) *
                    Number(selectedCrypto?.priceUSD)
            writeTransactionData(
                currentUser.uid,
                crypto,
                amount,
                SELL,
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
                                amount:
                                    Number(cryptoObj.amount) - Number(amount),
                            }
                        }
                        return cryptoObj
                    })
                )
            )
            navigation.navigate('Home')
        } else {
            console.log('Venta fallida')
        }
    }

    return (
        <View style={style.screen}>
            <View style={style.formContainer}>
                <Dropdown
                    placeholder="Selecciona una crypto"
                    options={cryptoPortfolio}
                    selectedValue={crypto}
                    onValueChange={handleCryptoChange}
                    primaryColor={color.information.primary}
                />
                <View style={style.switchContainer}>
                    <Text style={style.switchText}>Vender todo</Text>
                    <Switch
                        value={sellAllCrypto}
                        color={color.feedback.success}
                        onValueChange={handleSwitchChange}
                    />
                </View>

                <Input
                    value={amount}
                    onChangeText={handleAmountChange}
                    placeholder="Cantidad de cryptos"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                    keyboardType="numeric"
                    readOnly={sellAllCrypto}
                />
                <Input
                    value={equivalentUSD}
                    placeholder="Equivalente en USD aproximado"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputTextReadOnly}
                    readOnly
                />

                <Button
                    title="Vender"
                    type="outline"
                    disabled={isDisabled}
                    onPress={handleSell}
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

export default SalesScreen
