import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   authenticated: false,
   profilePicUrl: '',
   userId: null
}


const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState,
    reducers: {
        'UpdateAuthenticationInStore': (state, action) => {
            state.authenticated = action.payload.authenticated
            state.profilePicUrl = action.payload.profilePicUrl
            state.userId = action.payload.userId
            return
        },
        'ResetAuthenticationStore': (state, action) => {
            console.log('Reset Authentication Store called');
            
            state.authenticated = false
            state.profilePicUrl = ''
            state.userId = null
        }

    }
})




export default authenticationSlice.reducer

export const { UpdateAuthenticationInStore, ResetAuthenticationStore } = authenticationSlice.actions








