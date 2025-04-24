import { createSlice } from "@reduxjs/toolkit"
import { cardsToDisplayOnOnePage } from "../../constants"


const initialState = {

    orders: [],
    pagesAdded: [],
    totalOrders: null,

    deliveryDetails: {}

}


const sellerOrderSlice = createSlice({
    name: 'sellerOrderSlice',
    initialState,
    
    reducers: {

        'AddSellerOrdersInStore': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD SELLER ORDERS IN STORE', action.payload);
            
            const ordersToAdd = action.payload.ordersToAdd
            const pageNo = Number(action.payload.pageNo)
            const totalOrders = action.payload.totalOrders

            const orders = state.orders
            const totalOrdersToAdd = ordersToAdd.length

            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage

            for (let i = 0; i < totalOrdersToAdd; i++) {
                orders[itemsFrom + i] = ordersToAdd[i]
            }
            state.orders = orders

            const pagesAdded = state.pagesAdded
            pagesAdded.push(pageNo)
            state.pagesAdded = pagesAdded

            if (totalOrders) state.totalOrders = totalOrders

            return
        },

        'ChangeOrderStatusInStore': (state, action) => {
            console.log('PAYLOAD RECEIVED TO CHANGE ORDER STATUS', action.payload);
            

            const orderId = action.payload.orderId
            const orderStatus = action.payload.orderStatus
            const pageNo = action.payload.pageNo
            
            const itemsFrom = (pageNo * cardsToDisplayOnOnePage) - cardsToDisplayOnOnePage
            const itemsTo = (pageNo * cardsToDisplayOnOnePage)

            const orders = state.orders

            const modifiedOrders = orders.map((order, index) => {
                if ((index >= itemsFrom && index <= itemsTo) && (order._id == orderId)) {
                    return {...order, isCompleted: orderStatus}
                }
                return order
            })
            
            state.orders = modifiedOrders

            return

        },

        'AddDeliveryDetailsInStore': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD DELIVERY DETAILS IN STORE', action.payload);
            
            const currentDeliveryDetails = state.deliveryDetails

            const deliveryDetailsToAdd = action.payload.deliveryDetails
            const totalDeliveryDetails = (Object.keys(deliveryDetailsToAdd)).length
            const allItemId = Object.keys(deliveryDetailsToAdd)
            for (let i = 0; i < totalDeliveryDetails; i++) {
                currentDeliveryDetails[(allItemId[i])] = deliveryDetailsToAdd[(allItemId[i])]
            }

            state.deliveryDetails = currentDeliveryDetails
            return

        },

        'ResetSellerOrderSlice': (state, action) => {
            state.orders = []
            state.pagesAdded = []
            state.totalOrders = null
            state.deliveryDetails = {}
            return
        }

    },

})


export default sellerOrderSlice.reducer

export const { AddSellerOrdersInStore, ChangeOrderStatusInStore, AddDeliveryDetailsInStore, ResetSellerOrderSlice } = sellerOrderSlice.actions








