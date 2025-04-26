import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   authenticated: false
}


const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState,
    reducers: {
        'UpdateAuthenticationInStore': (state, action) => {
            state.authenticated = action.payload.authenticated
            return
        },

    }
})




export default authenticationSlice.reducer

export const { UpdateAuthenticationInStore } = authenticationSlice.actions








