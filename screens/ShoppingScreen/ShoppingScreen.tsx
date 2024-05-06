import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import style from './styles'
import Dropdown from 'react-native-input-select'
import color from '../../styles/colors'
import { useSelector, useDispatch } from 'react-redux'
import { formatToUSD, generateRandomSuccessRate } from '../../utils/utils'
import { BUY } from '../../utils/constants'
import { updateBalance } from '../../redux/slice/userSlice'
import { updateCryptoPortfolio } from '../../redux/slice/cryptoSlice'
import {
    writeTransactionData,
    updateUserData,
    writePortfoliosData,
} from '../../services/realtimeDatabase'
import { RootState, Navigation, Crypto } from '../../models'
import Rocket from '../../components/Rocket/Rocket'

const ShoppingScreen: React.FC<{ navigation: Navigation }> = ({
    navigation,
}) => {
    const currentUser = useSelector((state: RootState) => state.user.user)
    const cryptoPortfolio = useSelector(
        (state: RootState) => state.crypto.cryptoPortfolio
    )
    const dispatch = useDispatch()

    const [crypto, setCrypto] = useState<string>('')
    const [usdAmount, setUsdAmount] = useState<string>('')
    const [equivalentCrypto, setEquivalentCrypto] = useState<number>(0)
    const [showRocket, setShowRocket] = useState(false)

    const isDisabled =
        !crypto || !usdAmount || Number(usdAmount) > currentUser.balanceUSD

    const handleAmountChange = (value: string) => {
        setUsdAmount(value)

        const selectedCrypto = cryptoPortfolio.find(
            (cryptoObj) => cryptoObj.value === crypto
        )

        setEquivalentCrypto(Number(value) / (selectedCrypto?.priceUSD ?? 1))
    }

    const clearFields = () => {
        setCrypto('')
        setUsdAmount('')
        setEquivalentCrypto(0)
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
            setShowRocket(true)
            alert('La compra ha sido exitosa! 🚀')
            setTimeout(() => {
                setShowRocket(false)
                navigation.navigate('Home')
            }, 3000)
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
                    value={`$ ${equivalentCrypto.toFixed(2)} ${crypto}`}
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
                {showRocket && <Rocket isAnimated={showRocket} />}
            </View>
        </View>
    )
}

export default ShoppingScreen
