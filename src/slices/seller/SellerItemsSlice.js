import { createSlice } from "@reduxjs/toolkit"
import { cardsToDisplayOnOnePage } from "../../constants"



const initialState = {

    totalItems: null,
    items: [],
    itemsAddedForPageNo: []

}




const sellerItemsSlice = createSlice({
    name: 'sellerItemsSlice',
    initialState,
    reducers:{

        'AddItemsInAllItems': (state, action) => {
            const itemsToAdd = action.payload.itemsToAdd
            const pageNo = Number(action.payload.pageNo)
            const totalItems = Number(action.payload.totalItems)

            console.log('PAYLOAD RECEIVED TO ADD ITEMS', action.payload);
            console.log('ITEMS RECEIVED TO ADD IN STORE', itemsToAdd);
            console.log('PAGE NO STORING FOR IN STORE', pageNo);
            
            const currentItems = state.items
            const totalItemsToAdd = itemsToAdd.length

            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage

            for (let i = 0; i < totalItemsToAdd; i++) {
                currentItems[itemsFrom + i] = (itemsToAdd[i])
            }

            state.items = currentItems

            state.itemsAddedForPageNo.push(pageNo)

            if (totalItems) state.totalItems = totalItems
            
            return



        },

        'AddOneItemInAllItems': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD ONE ITEM IN STORE', action.payload);
            
            const itemToAdd = action.payload.newItem

            const pagesAdded = state.itemsAddedForPageNo
            const totalItems = state.totalItems

            const pagesRequiredToDisplayAllItems = Math.ceil((Number(totalItems)) / (Number(cardsToDisplayOnOnePage)))
            if (!(pagesAdded.includes(pagesRequiredToDisplayAllItems))) {
                state.totalItems = totalItems + 1
                return
            } 

            const currentItems = state.items
            const totalCurrentItems = currentItems.length
            const lastPageNoAdded = pagesAdded[((state.itemsAddedForPageNo).length) - 1]
            const limitOfItemsToBeStoredwithoutAddingNewPage = lastPageNoAdded * cardsToDisplayOnOnePage
            if (limitOfItemsToBeStoredwithoutAddingNewPage > totalCurrentItems) {
                // add more items without adding new page no
                currentItems.push(itemToAdd)
                state.items = currentItems
            }
            else {
                // add new page no and then add new item
                state.itemsAddedForPageNo.push((lastPageNoAdded + 1))
                currentItems.push(itemToAdd)
                state.items = currentItems
            }

            return

        },

        'AddItemOnPageNoInAllItems': (state, action) => {
            const pageNo = Number(action.payload.pageNo)
            const itemToAdd = action.payload.item

            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
            
            const items = state.items
            items[itemsFrom] = itemToAdd

            state.items = items
            return

        },

        'IncreaseItemStockInAllItems': (state, action) => {
            const itemId = action.payload.itemId
            const pageNo = Number(action.payload.pageNo)
            const stocktoIncreaseBy = action.payload.stockToIncreaseBy

            const items = state.items
            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
            const itemsTo = (pageNo * cardsToDisplayOnOnePage)
            const updatedItems = items.map((item, index) => {
                if ((index >= itemsFrom && index <= itemsTo) && (item._id == itemId)) {
                    return ({...item, stock: ((Number(item.stock)) + stocktoIncreaseBy)})
                }
                return item
            })

            state.items = updatedItems

            return
        },

        'DecreaseItemStockInAllItems': (state, action) => {
            const itemId = action.payload.itemId
            const pageNo = Number(action.payload.pageNo)
            const stockToDecreaseBy = action.payload.stockToDecreaseBy

            const items = state.items
            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
            const itemsTo = (pageNo * cardsToDisplayOnOnePage)
            const updatedItems = items.map((item, index) => {
                if ((index >= itemsFrom && index <= itemsTo) && (item._id == itemId)) {
                    if ((Number(item.stock)) < stockToDecreaseBy) {
                        return ({...item, stock: 0})
                    }
                    else {
                        return ({...item, stock: ((Number(item.stock)) - stockToDecreaseBy)})
                    }
                }
                return item
            })

            state.items = updatedItems
            
            return
        },

        'UpdateItemBioInAllItems': (state, action) => {
            const itemId = action.payload.item.itemId
            const itemName = action.payload.item.itemName
            const itemPrice = action.payload.item.itemPrice
            const itemCategories = action.payload.item.itemCategories
            const itemStock = action.payload.item.itemStock

            const pageNo = action.payload.pageNo

            const items = state.items

            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
            const itemsTo = (pageNo * cardsToDisplayOnOnePage)

            const updatedItems = items.map((item, index) => {
                if ((index >= itemsFrom && index <= itemsTo) && (item._id == itemId)) {
                    return ({...item, name: itemName, price: itemPrice, categories: itemCategories, stock: itemStock})
                }
                return item
            })

            state.items = updatedItems

            return

        },

        'UpdateItemImageInAllItems': (state, action) => {
            console.log('PAYLOAD', action.payload);
            
            const itemId = action.payload.itemId
            const itemImageOneUrl = action.payload.itemImageOneUrl
            const itemImageTwoUrl = action.payload.itemImageTwoUrl

            const imagesUrls = [itemImageOneUrl, itemImageTwoUrl]

            const pageNo = action.payload.pageNo

            const items = state.items

            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
            const itemsTo = (pageNo * cardsToDisplayOnOnePage)
            const updatedItems = items.map((item, index) => {
                if ((index >= itemsFrom && index <= itemsTo) && (item._id == itemId)) {
                    return ({...item, imagesUrls: imagesUrls})
                }
                return item
            })

            state.items = updatedItems

            return
        },

        'DeleteItemInAllItems': (state, action) => {
            const itemId = action.payload.itemId
            const pageNo = action.payload.pageNo
            
            const items = state.items

            const updatedItems = items.filter((item) => item._id != itemId)

            state.items = updatedItems
            state.totalItems = Number(state.totalItems) - 1
            const pagesAdded = state.itemsAddedForPageNo
            const filteredPages = []
            pagesAdded.forEach((pageAdd) => {
                if ((Number(pageAdd)) != (Number(pageNo))) filteredPages.push(pageAdd)
            })

            state.itemsAddedForPageNo = filteredPages

            return

        },

        'ResetSellerItemSlice': (state, action) => {
            state.totalItems = null
            state.items = []
            state.itemsAddedForPageNo = []
            return
        }


    },
    
})

export default sellerItemsSlice.reducer

export const { AddItemsInAllItems, AddOneItemInAllItems, AddItemOnPageNoInAllItems, IncreaseItemStockInAllItems, DecreaseItemStockInAllItems, UpdateItemBioInAllItems, UpdateItemImageInAllItems, DeleteItemInAllItems, ResetSellerItemSlice } = sellerItemsSlice.actions






