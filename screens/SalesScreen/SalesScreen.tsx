import React from 'react'
import { View, Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import style from './styles'
import color from '../../styles/colors'
import Dropdown from 'react-native-input-select'

const SalesScreen = () => {
    const dummyCryptoData = [
        {
            label: 'Bitcoin',
            value: 'BTC',
        },
        {
            label: 'Ethereum',
            value: 'ETH',
        },
        {
            label: 'Theter',
            value: 'USDT',
        },
        {
            label: 'Dogecoin',
            value: 'DOGE',
        },
    ]

    const [crypto, setCrypto] = React.useState('')
    return (
        <View style={style.screen}>
            <Text style={style.title}>Vender Crypo</Text>

            <Dropdown
                label="Crypto"
                placeholder="Select an option..."
                options={dummyCryptoData}
                selectedValue={crypto}
                onValueChange={() => {}}
                primaryColor={color.information.primary}
            />

            <Input
                placeholder="Cantidad"
                inputContainerStyle={style.inputContainer}
                inputStyle={style.inputText}
            />

            <Button
                title="Comprar"
                type="outline"
                onPress={() => {}}
                buttonStyle={style.button.container}
                titleStyle={style.button.text}
            />
        </View>
    )
}

export default SalesScreen
