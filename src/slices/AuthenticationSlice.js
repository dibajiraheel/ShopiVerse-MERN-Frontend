import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   authenticated: false,
   profilePicUrl: ''
}


const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState,
    reducers: {
        'UpdateAuthenticationInStore': (state, action) => {
            state.authenticated = action.payload.authenticated
            state.profilePicUrl = action.payload.profilePicUrl
            return
        },

    }
})




export default authenticationSlice.reducer

export const { UpdateAuthenticationInStore } = authenticationSlice.actions








