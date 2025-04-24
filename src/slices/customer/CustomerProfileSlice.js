import { createSlice } from "@reduxjs/toolkit"





const initialState = {
    profile: {}
}



const customerProfileSlice = createSlice({
    name: 'customerProfileSlice',
    initialState,
    reducers: {

        'AddProfileInCustomerSlice': (state, action) => {

            const profileToAdd = action.payload.profile
            state.profile = profileToAdd

        },

        'ResetProfileInCustomerSlice': (state, action) => {
            
            state.profile = {}
            return
            
        }

    }
})



export const { AddProfileInCustomerSlice, ResetProfileInCustomerSlice } = customerProfileSlice.actions

export default customerProfileSlice.reducer


