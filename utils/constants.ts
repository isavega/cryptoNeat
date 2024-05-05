export const dummyCryptoData = [
    {
        id: 1,
        label: 'Bitcoin',
        value: 'BTC',
        priceUSD: '63212.5',
        amount: '0.019',
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    },
    {
        id: 2,
        label: 'Ethereum',
        value: 'ETH',
        priceUSD: '26.7',
        amount: '18.74',
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    },
    {
        id: 3,
        label: 'Theter',
        value: 'USDT',
        priceUSD: '1',
        amount: '100',
        image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    },
    {
        id: 4,
        label: 'Dogecoin',
        value: 'DOGE',
        priceUSD: '0.16',
        amount: '1269.41',
        image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    },
]

export const dummyTransactionData = [
    {
        date: '2021-06-01',
        amount: 0.1,
        crypto: 'BTC',
        type: 'BUY',
    },
    {
        date: '2021-06-02',
        amount: 0.2,
        crypto: 'ETH',
        type: 'SELL',
    },
    {
        date: '2021-06-03',
        amount: 0.3,
        crypto: 'USDT',
        type: 'SELL',
    },
    {
        date: '2021-06-04',
        amount: 0.4,
        crypto: 'DOGE',
        type: 'BUY',
    },
    {
        date: '2021-06-05',
        amount: 0.5,
        crypto: 'BTC',
        type: 'SELL',
    },
    {
        date: '2021-06-06',
        amount: 0.6,
        crypto: 'ETH',
        type: 'BUY',
    },
    {
        date: '2021-06-07',
        amount: 0.7,
        crypto: 'USDT',
        type: 'SELL',
    },
    {
        date: '2021-06-08',
        amount: 0.8,
        crypto: 'DOGE',
        type: 'BUY',
    },
]

export const BUY = 'BUY'
export const SELL = 'SELL'

export const transactionTypeMap = {
    BUY: 'Compra',
    SELL: 'Venta',
}
