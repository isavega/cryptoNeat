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
    writePortfoliosData,
} from '../../services/realtimeDatabase'

const SalesScreen = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.user)
    const cryptoPortfolio = useSelector((state) => state.crypto.cryptoPortfolio)
    const dispatch = useDispatch()
    const [sellAllCrypto, setSellAllCrypto] = useState(true)
    const [crypto, setCrypto] = useState('')
    const [cryptoAmount, setCryptoAmount] = useState(0)
    const [equivalentUSD, setEquivalentUSD] = useState(0)

    const handleCryptoChange = (value) => {
        const selectedCrypto = cryptoPortfolio.find(
            (crypto) => crypto.value === value
        )

        setCrypto(value)
        setCryptoAmount(selectedCrypto?.amount.toString())
        setEquivalentUSD(
            Number(selectedCrypto?.amount) * Number(selectedCrypto?.priceUSD)
        )
    }

    const handleAmountChange = (value) => {
        setCryptoAmount(value)

        const selectedCrypto = cryptoPortfolio.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentUSD(Number(value) * Number(selectedCrypto?.priceUSD))
    }

    const handleSwitchChange = () => {
        setSellAllCrypto(!sellAllCrypto)

        setCryptoAmount(
            sellAllCrypto
                ? ''
                : cryptoPortfolio.find((crypto) => crypto === crypto).amount
        )
        setEquivalentUSD(
            sellAllCrypto
                ? 0
                : Number(
                      cryptoPortfolio.find(
                          (cryptoObj) => cryptoObj.value === crypto
                      ).amount
                  ) *
                      Number(
                          cryptoPortfolio.find(
                              (cryptoObj) => cryptoObj.value === crypto
                          ).priceUSD
                      )
        )
    }

    const isDisabled =
        !crypto ||
        !cryptoAmount ||
        cryptoAmount >
            cryptoPortfolio.find((cryptoObj) => cryptoObj.value === crypto)
                .amount

    const clearFields = () => {
        setCrypto('')
        setCryptoAmount(0)
        setEquivalentUSD(0)
    }

    const getNewCryptoPortfolio = (cryptoPortfolio, crypto, amount) => {
        return cryptoPortfolio.map((cryptoObj) => {
            if (cryptoObj.value === crypto) {
                return {
                    ...cryptoObj,
                    amount: Number(cryptoObj.amount) - Number(amount),
                }
            }
            return cryptoObj
        })
    }

    const handleSell = () => {
        const isSuccessful = generateRandomSuccessRate()
        if (isSuccessful) {
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
                cryptoAmount,
                SELL,
                new Date().toISOString()
            )
            writePortfoliosData(
                currentUser.uid,
                getNewCryptoPortfolio(cryptoPortfolio, crypto, cryptoAmount)
            )
            updateUserData(currentUser.uid, newBalance)
            dispatch(updateBalance(newBalance))
            dispatch(
                updateCryptoPortfolio(
                    getNewCryptoPortfolio(cryptoPortfolio, crypto, cryptoAmount)
                )
            )
            clearFields()
            navigation.navigate('Home')
        } else {
            alert('La venta ha fallado, intenta de nuevo.')
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
                    value={`${cryptoAmount}`}
                    onChangeText={handleAmountChange}
                    placeholder="Cantidad de cryptos"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                    keyboardType="numeric"
                    readOnly={sellAllCrypto}
                />
                <Input
                    value={`$ ${equivalentUSD} USD`}
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
