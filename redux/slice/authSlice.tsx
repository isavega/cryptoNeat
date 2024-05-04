// authSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        signIn: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logOut: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

export const { signUp, signIn, logOut } = authSlice.actions
export const selectAuth = (state) => state.auth
export default authSlice.reducer
