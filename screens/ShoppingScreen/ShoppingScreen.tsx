import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import style from './styles'
import Dropdown from 'react-native-input-select'
import color from '../../styles/colors'
import { dummyCryptoData } from '../../utils/constants'
import { useSelector } from 'react-redux'

const ShoppingScreen = () => {
    const usdBalance = useSelector((state) => state.user.usdBalance)

    const [crypto, setCrypto] = useState('')
    const [amount, setAmount] = useState('')
    const [equivalentUSD, setEquivalentUSD] = useState('')

    const isDisabled = !crypto || !amount || amount > usdBalance

    const handleAmountChange = (value) => {
        setAmount(value)

        const selectedCrypto = dummyCryptoData.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentUSD(
            `$ ${Number(value) / Number(selectedCrypto.priceUSD)} ${
                selectedCrypto.value
            }`
        )
    }

    return (
        <View style={style.screen}>
            <View style={style.formContainer}>
                <Text style={style.text}>Saldo disponible</Text>
                <Text style={style.textBalance}>{usdBalance} USD</Text>
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

export default ShoppingScreen
