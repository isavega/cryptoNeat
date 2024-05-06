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
    writePortfoliosData,
} from '../../services/realtimeDatabase'

const ShoppingScreen = ({ navigation }) => {
    const currentUser = useSelector((state) => state.user.user)
    const cryptoPortfolio = useSelector((state) => state.crypto.cryptoPortfolio)
    const dispatch = useDispatch()

    const [crypto, setCrypto] = useState('')
    const [usdAmount, setUsdAmount] = useState('')
    const [equivalentCrypto, setEquivalentCrypto] = useState(0)

    const isDisabled =
        !crypto || !usdAmount || usdAmount > currentUser.balanceUSD

    const handleAmountChange = (value) => {
        setUsdAmount(value)

        const selectedCrypto = cryptoPortfolio.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentCrypto(Number(value) / Number(selectedCrypto?.priceUSD))
    }

    const clearFields = () => {
        setCrypto('')
        setUsdAmount('')
        setEquivalentCrypto(0)
    }

    const getNewCryptoPortfolio = (cryptoPortfolio, crypto, amount) => {
        return cryptoPortfolio.map((cryptoObj) => {
            if (cryptoObj.value === crypto) {
                return {
                    ...cryptoObj,
                    amount: Number(cryptoObj.amount) + Number(amount),
                }
            }
            return cryptoObj
        })
    }

    const handleBuy = () => {
        const isSuccessful = generateRandomSuccessRate()
        if (isSuccessful) {
            const newBalance = currentUser.balanceUSD - Number(usdAmount)
            const newPortfolio = getNewCryptoPortfolio(
                cryptoPortfolio,
                crypto,
                equivalentCrypto
            )
            writeTransactionData(
                currentUser.uid,
                crypto,
                usdAmount,
                BUY,
                new Date().toISOString()
            )
            writePortfoliosData(currentUser.uid, newPortfolio)

            updateUserData(currentUser.uid, newBalance)
            dispatch(updateBalance(newBalance))
            dispatch(updateCryptoPortfolio(newPortfolio))
            clearFields()
            navigation.navigate('Home')
        } else {
            alert('La compra ha fallado, intenta de nuevo.')
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
                    value={usdAmount}
                    onChangeText={handleAmountChange}
                    placeholder="Cantidad de USD"
                    inputContainerStyle={style.inputContainer}
                    inputStyle={style.inputText}
                    keyboardType="numeric"
                    readOnly={!crypto}
                />
                <Input
                    value={`$ ${equivalentCrypto} ${crypto}`}
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
