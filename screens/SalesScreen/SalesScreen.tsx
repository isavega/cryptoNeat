import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input, Switch } from '@rneui/themed'
import style from './styles'
import color from '../../styles/colors'
import Dropdown from 'react-native-input-select'
import { dummyCryptoData } from '../../utils/constants'

const SalesScreen = () => {
    const [sellAllCrypto, setSellAllCrypto] = useState(true)
    const [crypto, setCrypto] = useState('')
    const [amount, setAmount] = useState('')
    const [equivalentUSD, setEquivalentUSD] = useState('')

    const handleCryptoChange = (value) => {
        const selectedCrypto = dummyCryptoData.find(
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

        const selectedCrypto = dummyCryptoData.find(
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
                : dummyCryptoData.find((crypto) => crypto === crypto).amount
        )
        setEquivalentUSD(
            sellAllCrypto
                ? ''
                : `$ ${(
                      Number(
                          dummyCryptoData.find(
                              (cryptoObj) => cryptoObj.value === crypto
                          ).amount
                      ) *
                      Number(
                          dummyCryptoData.find(
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
            dummyCryptoData.find((cryptoObj) => cryptoObj.value === crypto)
                .amount

    return (
        <View style={style.screen}>
            <View style={style.formContainer}>
                <Dropdown
                    placeholder="Selecciona una crypto"
                    options={dummyCryptoData}
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
                    onPress={() => {}}
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
