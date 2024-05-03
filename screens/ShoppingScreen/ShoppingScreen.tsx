import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import style from './styles'
import Dropdown from 'react-native-input-select'

const ShoppingScreen = (props) => {
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
            <Text style={style.title}>Comprar Crypo</Text>

            <Dropdown
                label="Country"
                placeholder="Select an option..."
                options={dummyCryptoData}
                selectedValue={crypto}
                onValueChange={() => {}}
                primaryColor={'green'}
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

export default ShoppingScreen
