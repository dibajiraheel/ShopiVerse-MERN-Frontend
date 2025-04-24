import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userName: null,
    cnic: null,
    phoneNo: null,
    address: null,
    province: null,
    city: null,
}


const sellerProfileSlice = createSlice({
    name: 'sellerProfileSlice',
    initialState,
    reducers: {

        'UpdateSellerProfileInStore': (state, action) => {
            
            console.log('PAYLOAD RECEIVED', action.payload);
            const userName = action.payload.profile.userName
            const cnic = action.payload.profile.cnic
            const address = action.payload.profile.address
            const phoneNo = action.payload.profile.phoneNo
            const province = action.payload.profile.province
            const city = action.payload.profile.city
            
            state.userName = userName
            state.cnic = cnic
            state.address = address
            state.phoneNo = phoneNo
            state.province = province
            state.city = city
            return

        },

        'ResetSellerProfileSlice': (state, action) => {
            state.userName = null
            state.cnic = null
            state.phoneNo = null
            state.address = null
            state.province = null
            state.city = null
            return
        }

    }
})



export default sellerProfileSlice.reducer

export const { UpdateSellerProfileInStore, ResetSellerProfileSlice } = sellerProfileSlice.actions





