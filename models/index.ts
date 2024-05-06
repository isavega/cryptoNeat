export interface Navigation {
    navigate: (screen: string) => void
}

export interface Crypto {
    id: number
    label: string
    image: string
    amount: number
    value: string
    priceUSD: number
}

export interface RootState {
    user: {
        user: {
            uid: string
            email: string
            username: string
            balanceUSD: number
        }
        isAuthenticated: boolean
    }
    crypto: {
        cryptoPortfolio: Crypto[]
    }
}

export interface Transaction {
    date: string
    operationType: string
    amount: number
    crypto: string
}
