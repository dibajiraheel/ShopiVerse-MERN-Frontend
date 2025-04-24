import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    totalItems: 0,
    totalUniqueItems: 0,
    totalAmount: 0,
    cart: []
}


const customerCartSlice = createSlice({
    name: 'customerCartSlice',
    initialState,
    reducers: {
        
        'AddItemInCartInCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD ITEM IN CART', action.payload);
            
            const newItem = action.payload.newItem
            const currentItems = state.cart
            const totalItems = state.totalItems
            const totalAmount = state.totalAmount
            const totalUniqueItems = state.totalUniqueItems

            let itemAlreadyExistInCart = false
            let updatedCart = []
            console.log('CURRENT CART', currentItems);
            
            for (let i = 0; i < totalUniqueItems; i++) {
                const currentItem = currentItems[i]
                console.log('CURRENT ITEM', currentItem);
                console.log('NEW ITEM', newItem);
                
                
                if (currentItem.itemId == newItem.itemId) {
                    
                    itemAlreadyExistInCart = true
                    
                    const currentItemQuantity = Number(currentItem.itemQuantity)
                    const moreQuantityToAdd = Number(newItem.itemQuantity)

                    const currentItemAmount = Number(currentItem.itemAmount)
                    const itemPrice = Number(currentItem.itemPrice)

                    updatedCart.push({...currentItem, itemQuantity: (currentItemQuantity + moreQuantityToAdd), itemAmount: (currentItemAmount + (itemPrice * moreQuantityToAdd))})

                    const moreAmountToAddInTotalAmount = itemPrice * moreQuantityToAdd



                    state.totalAmount = totalAmount + moreAmountToAddInTotalAmount
                    state.totalItems = totalItems + moreQuantityToAdd
                } 
                else {
                    updatedCart.push(currentItem)
                }
            }

            if (itemAlreadyExistInCart) {
                state.cart = updatedCart
            }

            else {
                const allItems = [...currentItems, newItem]
                
                state.cart = allItems
                state.totalAmount = totalAmount + Number(newItem.itemAmount)
                state.totalItems = totalItems + Number(newItem.itemQuantity)
                state.totalUniqueItems = totalUniqueItems + 1
            }

            const cartStorage = {
                cart: state.cart,
                totalItems: state.totalItems,
                totalUniqueItems: state.totalUniqueItems,
                totalAmount: state.totalUniqueItems
            }
            
            localStorage.setItem('cartStorage', (JSON.stringify(cartStorage)))





        },

        'RemoveItemFromCartInCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO REMOVE ITEM FROM CART', action.payload);
            
            const itemId = action.payload.itemId
            const currentItems = state.cart
            const totalItems = state.totalItems
            const totalAmount = state.totalAmount
            const totalUniqueItems = state.totalUniqueItems

            console.log('CURRENT ITEMS', currentItems);
            

            let newItems = []
            let amountToRemove = null
            let quantityToRemove = null
            for (let i = 0; i < totalUniqueItems; i++) {
                const item = currentItems[i]
                console.log('ITEM CHECKING FOR',item);
                if (item.itemId == itemId) {
                    amountToRemove = Number(item.itemAmount)
                    quantityToRemove = Number(item.itemQuantity)
                }
                else newItems.push(item)
            }

            state.cart = newItems
            state.totalItems = totalItems - quantityToRemove
            state.totalUniqueItems = totalUniqueItems - 1
            console.log('TOTAL AND AMOUNT TO REMOVE', totalAmount, amountToRemove);
            
            state.totalAmount = totalAmount - amountToRemove
            
            const cartStorage = {
                cart: state.cart,
                totalItems: state.totalItems,
                totalUniqueItems: state.totalUniqueItems,
                totalAmount: state.totalUniqueItems
            }
            
            localStorage.setItem('cartStorage', (JSON.stringify(cartStorage)))




            return

        }

    }

})




export const { AddItemInCartInCustomerSlice, RemoveItemFromCartInCustomerSlice } = customerCartSlice.actions

export default customerCartSlice.reducer


