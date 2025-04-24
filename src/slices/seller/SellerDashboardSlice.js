import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    fetchedForXDays: null,
    totalOrders: null,
    totalActiveOrders: null,
    totalOrdersReceivedInLastXDays: [],
    totalSalesInLastXDays: [],
    totalOrdersReceivedToday: null,
    dates: []
}


const sellerDashboardSlice = createSlice({
    name: 'sellerDashboardSlice',
    initialState,
    reducers: {
        'AddDataInSellerDashboardSlice': (state, action) => {
            state.fetchedForXDays = action.payload.sellerDashboard.fetchedForXDays
            state.totalOrders = action.payload.sellerDashboard.totalOrders
            state.totalActiveOrders = action.payload.sellerDashboard.totalActiveOrders
            state.totalOrdersReceivedInLastXDays = action.payload.sellerDashboard.totalOrdersReceivedInLastXDays
            state.totalSalesInLastXDays = action.payload.sellerDashboard.totalSalesInLastXDays
            state.totalOrdersReceivedToday = action.payload.sellerDashboard.totalOrdersReceivedToday
            state.dates = action.payload.sellerDashboard.dates
            return
        },

        'ResetSellerDashboardSlice': (state, action) => {
            state.fetchedForXDays = null
            state.totalOrders = null
            state.totalActiveOrders = null
            state.totalOrdersReceivedInLastXDays = []
            state.totalSalesInLastXDays = []
            state.totalOrdersReceivedToday = null
            state.dates = []
            return
        },

        'UpdateTotalActiveOrdersInSellerDashboardSlice': (state, action) => {
            console.log('UPDATE RECEIVED IN STORE', action.payload.update);
            
            const update = action.payload.update
            const totalActiveOrders = state.totalActiveOrders
            if (update == 'increase') {
                state.totalActiveOrders = Number(totalActiveOrders) + 1
                return
            }
            else if (update == 'decrease') {
                state.totalActiveOrders = Number(totalActiveOrders) - 1
                return
            }
        }

    }
})




export default sellerDashboardSlice.reducer

export const { AddDataInSellerDashboardSlice, ResetSellerDashboardSlice, UpdateTotalActiveOrdersInSellerDashboardSlice } = sellerDashboardSlice.actions








