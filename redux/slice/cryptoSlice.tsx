import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cryptoPortfolio: [
        {
            id: 1,
            label: 'Bitcoin',
            value: 'BTC',
            priceUSD: '64354.1',
            amount: '0.16',
            image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        },
        {
            id: 2,
            label: 'Ethereum',
            value: 'ETH',
            priceUSD: '3163.61',
            amount: '0.32',
            image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        },
        {
            id: 3,
            label: 'Theter',
            value: 'USDT',
            priceUSD: '1',
            amount: '500',
            image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        },
        {
            id: 4,
            label: 'Dogecoin',
            value: 'DOGE',
            priceUSD: '0.16',
            amount: '613.94',
            image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
        },
    ],
}

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        updateCryptoPortfolio: (state, action) => {
            state.cryptoPortfolio = action.payload
        },
    },
})

export const { updateCryptoPortfolio } = cryptoSlice.actions
export default cryptoSlice.reducer
