import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    usdBalance: 100,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.user = action.payload
        },
        signIn: (state, action) => {
            state.user = action.payload
        },
        logOut: (state) => {
            state.user = null
        },
    },
})

export const { signUp, signIn, logOut } = userSlice.actions
export default userSlice.reducer
