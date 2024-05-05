import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
