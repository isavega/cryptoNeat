import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input, Switch } from '@rneui/themed'
import style from './styles'
import color from '../../styles/colors'
import Dropdown from 'react-native-input-select'
import { useSelector, useDispatch } from 'react-redux'
import { generateRandomSuccessRate } from '../../utils/utils'
import { SELL } from '../../utils/constants'
import { updateBalance } from '../../redux/slice/userSlice'
import { updateCryptoPortfolio } from '../../redux/slice/cryptoSlice'
import {
    writeTransactionData,
    updateUserData,
    writePortfoliosData,
} from '../../services/realtimeDatabase'
import { RootState, Navigation, Crypto } from '../../models'
import Rocket from '../../components/Rocket/Rocket'

const SalesScreen: React.FC<{ navigation: Navigation }> = ({ navigation }) => {
    const currentUser = useSelector((state: RootState) => state.user.user)
    const cryptoPortfolio = useSelector(
        (state: RootState) => state.crypto.cryptoPortfolio
    )
    const dispatch = useDispatch()
    const [sellAllCrypto, setSellAllCrypto] = useState(true)
    const [crypto, setCrypto] = useState<string>('')
    const [cryptoAmount, setCryptoAmount] = useState<number>(0)
    const [equivalentUSD, setEquivalentUSD] = useState<number>(0)
    const [showRocket, setShowRocket] = useState(false)

    const handleCryptoChange = (value: string) => {
        const selectedCrypto = cryptoPortfolio.find(
            (crypto) => crypto.value === value
        )

        setCrypto(value)
        setCryptoAmount(selectedCrypto?.amount ?? 0)
        setEquivalentUSD(
            (selectedCrypto?.amount ?? 0) * (selectedCrypto?.priceUSD ?? 0)
        )
    }

    const handleAmountChange = (value: string) => {
        setCryptoAmount(Number(value))

        const selectedCrypto = cryptoPortfolio.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentUSD(Number(value) * (selectedCrypto?.priceUSD ?? 0))
    }

    const handleSwitchChange = () => {
        setSellAllCrypto(!sellAllCrypto)

        setCryptoAmount(
            sellAllCrypto
                ? 0
                : cryptoPortfolio.find((crypto) => crypto === crypto)?.amount ??
                      0
        )
        setEquivalentUSD(
            sellAllCrypto
                ? 0
                : (cryptoPortfolio.find(
                      (cryptoObj) => cryptoObj.value === crypto
                  )?.amount ?? 0) *
                      (cryptoPortfolio.find(
                          (cryptoObj) => cryptoObj.value === crypto
                      )?.priceUSD ?? 0)
        )
    }

    const isDisabled =
        !crypto ||
        !cryptoAmount ||
        cryptoAmount >
            (cryptoPortfolio.find((cryptoObj) => cryptoObj.value === crypto)
                ?.amount ?? 0)

    const clearFields = () => {
        setCrypto('')
        setCryptoAmount(0)
        setEquivalentUSD(0)
    }

    const getNewCryptoPortfolio = (
        cryptoPortfolio: Crypto[],
        crypto: string,
        amount: number
    ) => {
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
                (selectedCrypto?.amount ?? 0) * (selectedCrypto?.priceUSD ?? 0)
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
            setShowRocket(true)
            alert('La venta ha sido exitosa! 🚀')
            setTimeout(() => {
                setShowRocket(false)
                navigation.navigate('Home')
            }, 3000)
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
                {showRocket && <Rocket isAnimated={showRocket} />}
            </View>
        </View>
    )
}

export default SalesScreen
