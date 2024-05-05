import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        uid: '',
        email: '',
        displayName: '',
        balanceUSD: 0,
    },
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        signIn: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logOut: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
        updateBalance: (state, action) => {
            state.user.balanceUSD = action.payload
        },
    },
})

export const { signUp, signIn, logOut, updateBalance } = userSlice.actions
export default userSlice.reducer
