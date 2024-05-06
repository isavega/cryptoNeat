import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import crypoReducer from '../slice/cryptoSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        crypto: crypoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
