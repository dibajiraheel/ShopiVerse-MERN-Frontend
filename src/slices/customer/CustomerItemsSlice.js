import { createSlice } from "@reduxjs/toolkit"
import { cardsToDisplayOnOnePage } from '../../constants'





const initialState = {
    totalItems: null,
    items: [],
    pagesAdded: [],
}



const customerItemsSlice = createSlice({
    name: 'customerItemSlice',
    initialState,
    reducers: {

        'AddItemsInCustomerSlice': (state, action) => {

            console.log('PAYLOAD RECEIVED TO ADD ITEMS', action.payload);
            const newItems = action.payload.newItems
            const pageNo = action.payload.pageNo
            const currentItems = state.items

            const itemsStartIndex = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
            const itemsEndIndex = Number(pageNo) * Number(cardsToDisplayOnOnePage)

            const totalNewItems = newItems.length
            
            for (let i = 0; i < totalNewItems; i++) {
                currentItems[itemsStartIndex + i] = newItems[i]    
            }

            state.items = currentItems

            const totalItems = action.payload.totalItems
            if (totalItems) {
                state.totalItems = totalItems
            }

            const pagesAdded = state.pagesAdded
            pagesAdded.push(action.payload.pageNo)
            state.pagesAdded = pagesAdded

            return

        },
        
        'AddOneItemInAllItemsCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD ITEMS', action.payload.item);
            const itemToAdd = action.payload.item
            const pageNo = action.payload.pageNo
            const currentItems = state.items
            
            const itemStartIndex = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))

            currentItems[itemStartIndex] = itemToAdd
            
            state.items = currentItems

            return
        },

        'UpdateItemStockInAllItemsCustomerSlice': (state, action) => {

            const pageNo = action.payload.pageNo
            const itemId = action.payload.itemId
            const decreaseStockBy = Number(action.payload.itemQuantityBought)

            console.log('PAGE NO RECEIVED', pageNo, typeof(pageNo));
            

            const itemStartIndex = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
            const itemEndIndex = (Number(pageNo) * Number(cardsToDisplayOnOnePage))
        
            const itemFound = state.items.slice(itemStartIndex, itemEndIndex).find((item) => item._id == itemId)
            console.log('ITEM FOUND IN STORE', itemFound);
            
            if (itemFound) {
                itemFound.stock = ((Number(itemFound.stock)) - decreaseStockBy)
            }

        },

        'ResetItemsInCustomerSlice': (state, action) => {
            
            state.totalItems = null
            state.items = []
            state.pagesAdded = []
            return
            
        }

    }
})



export const { AddItemsInCustomerSlice, AddOneItemInAllItemsCustomerSlice, UpdateItemStockInAllItemsCustomerSlice, ResetItemsInCustomerSlice } = customerItemsSlice.actions

export default customerItemsSlice.reducer


