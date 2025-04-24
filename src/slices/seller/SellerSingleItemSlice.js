import { createSlice } from "@reduxjs/toolkit"




const initialState = {
    items: {},
    itemsUpdated: {}
}


const sellerSingleItemSlice = createSlice({
    name: 'sellerSingleItemSlice',
    initialState,
    reducers: {

        'AddItemInSingleItemSlice': (state, action) => {

            console.log('PAYLOAD RECEIVED TO ADD ITEM IN STORE', action.payload);

            const currentItems = state.items
            const itemId = action.payload.itemId
            const itemName = action.payload.itemName
            const itemDescription = action.payload.itemDescription
            const itemPrice = action.payload.itemPrice
            const itemCategories = action.payload.itemCategories
            const itemStock = action.payload.itemStock
            const itemSold = action.payload.itemSold
            const itemImageOneUrl = action.payload.itemImageOneUrl
            const itemImageTwoUrl = action.payload.itemImageTwoUrl

            const itemToAdd = {
                itemId,
                itemName,
                itemCategories,
                itemPrice,
                itemStock,
                itemDescription,
                itemSold,
                itemImageOneUrl,
                itemImageTwoUrl
            }

            console.log('ITEM TO ADD IN STORE', itemToAdd);
            

            state.items = {...currentItems, [itemId]: itemToAdd}
            const currentItemsUpdated = state.itemsUpdated
            state.itemsUpdated = {...currentItemsUpdated, [itemId]: false}
            return

        },

        'UpdateItemImagesUrlInSingleItemSlice': (state, action) => {
            
            
            const itemId = action.payload.itemId
            const itemImageOneUrl = action.payload.itemImageOneUrl
            const itemImageTwoUrl = action.payload.itemImageTwoUrl

            const currentItems = state.items
            
            const foundItem = currentItems[itemId]
            
            if (!foundItem.itemId) return
            foundItem.itemImageOneUrl = itemImageOneUrl
            foundItem.itemImageTwoUrl = itemImageTwoUrl

            state.items = {...currentItems, [itemId]: foundItem}
            return

        },

        'UpdateItemInSingleItemSlice': (state, action) => {

            console.log('UPDATE SINGLE ITEM IN STORE CALLED', action.payload);
            

            const itemId = action.payload.itemId
            const itemName = action.payload.itemName
            const itemDescription = action.payload.itemDescription
            const itemPrice = action.payload.itemPrice
            const itemStock = action.payload.itemStock
            const itemCategories = action.payload.itemCategories


            const currentItems = state.items
            const foundItem = currentItems[itemId]

            if (!foundItem.itemId) return
            foundItem.itemId = itemId
            foundItem.itemName = itemName
            foundItem.itemDescription = itemDescription
            foundItem.itemPrice = itemPrice
            foundItem.itemStock = itemStock
            foundItem.itemCategories = itemCategories

            state.items = {...currentItems, [itemId]: foundItem}
            return

        },

        'UpdateItemUpdatedInSingleItemSlice': (state, action) => {
            
            
            const itemId = action.payload.itemId
            const makeIt = action.payload.value
            const currentItemsUpdated = state.itemsUpdated
            state.itemsUpdated = {...currentItemsUpdated, [itemId]: makeIt}
            return

        },

        'ResetSellerSingleItemSlice': (state, action) => {
            state.items = {}
            state.itemsUpdated = {}
            return
        }

    }

})



export default sellerSingleItemSlice.reducer

export const { AddItemInSingleItemSlice, UpdateItemImagesUrlInSingleItemSlice, UpdateItemInSingleItemSlice, UpdateItemUpdatedInSingleItemSlice, ResetSellerSingleItemSlice } = sellerSingleItemSlice.actions



