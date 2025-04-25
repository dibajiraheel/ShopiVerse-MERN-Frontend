import { cardsToDisplayOnOnePage } from "../../constants";
import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    totalOrders: 0,
    orders: [],
    pagesAdded: []
}




const customerOrdersSlice = createSlice({
    name: 'customerOrdersSlice',
    initialState,
    reducers: {

        'AddOrdersInCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD ORDERS', action.payload);

            const newOrders = action.payload.newOrders
            const pageNo = action.payload.pageNo
            const totalOrders = action.payload.totalOrders

            if (newOrders?.length == 0 || (!newOrders)) return

            const currentOrders = [...(state.orders)]
            
            const ordersIndexFrom = ((Number(pageNo) * Number(cardsToDisplayOnOnePage)) - Number(cardsToDisplayOnOnePage))
            const ordersIndexTo = (Number(pageNo) * Number(cardsToDisplayOnOnePage))
            const totalOrdersToAdd = newOrders.length
            for (let i = 0; i < totalOrdersToAdd; i++) {
                currentOrders[ordersIndexFrom + i] = newOrders[i] 
            }
            
            state.orders = currentOrders

            const pagesAdded = state.pagesAdded
            pagesAdded.push(Number(pageNo))
            state.pagesAdded = pagesAdded

            if (totalOrders) state.totalOrders = totalOrders
                        
            return

        },

        'AddSingleOrderInCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD ORDER IN STORE', action.payload);
            
            const orders = state.orders
            const pagesAdded = state.pagesAdded
            const totalOrders = state.totalOrders

            const pagesRequiredForAllOrders = Math.ceil((Number(totalOrders)) / (Number(cardsToDisplayOnOnePage)))
            if (!(pagesAdded.includes(pagesRequiredForAllOrders))) {
                state.totalOrders = totalOrders + 1
                return
            }

            const newOrder = action.payload.newOrder

            const lastPageNo = Number(pagesAdded[((pagesAdded.length) - 1)])

            const totalOrdersThatCanBeStoredWithinThisLastPage = cardsToDisplayOnOnePage * Number(lastPageNo)
            const totalOrdersCurrentlyStored = orders.length
            
            if (totalOrdersCurrentlyStored < totalOrdersThatCanBeStoredWithinThisLastPage) {
                // add new orders without adding new page no
                orders.push(newOrder)
                state.orders = orders
            }
            else {
                // add new page no and then add new order
                pagesAdded.push((Number(lastPageNo + 1)))
                orders.push(newOrder)
                state.orders = orders
            }
        },

        'ResetCustomerOrdersSlice': (state, action) => {
            state.totalOrders = 0
            state.orders = []
            state.pagesAdded = []
            return

        }

    }
})



export const { AddOrdersInCustomerSlice, AddSingleOrderInCustomerSlice, ResetCustomerOrdersSlice } = customerOrdersSlice.actions

export default customerOrdersSlice.reducer




