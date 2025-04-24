import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    items: {}
}



const customerItemSlice = createSlice({
    name: 'customerItemSlice',
    initialState,
    reducers: {

        'AddItemInCustomerSlice': (state, action) => {
            
            console.log('PAYLOAD RECEIVED TO ADD ITEM', action.payload);
            
            const newItem = action.payload.item
            const currentItems = state.items

            const allItems = {...currentItems, [newItem.itemId]: newItem}

            state.items = allItems
            return

        },

        'ResetItemInCustomerSlice': (state, action) => {
            state.items = {}
            return
        }

    }
})


export const { AddItemInCustomerSlice, ResetItemInCustomerSlice } = customerItemSlice.actions

export default customerItemSlice.reducer

