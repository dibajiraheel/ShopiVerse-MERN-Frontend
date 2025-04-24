import { configureStore } from "@reduxjs/toolkit"
import themeSlice from '../slices/ThemeSlice'
import sellerOrderSlice from "../slices/seller/SellerOrderSlice"
import sellerItemsSlice from "../slices/seller/SellerItemsSlice"
import sellerSingleItemSlice from "../slices/seller/SellerSingleItemSlice"
import sellerItemReviewSlice from "../slices/seller/SellerItemReview"
import sellerProfileSlice from "../slices/seller/SellerProfile"
import sellerDashboardSlice from "../slices/seller/SellerDashboardSlice"
import customerItemsSlice from "../slices/customer/CustomerItemsSlice"
import customerItemSlice from "../slices/customer/CustomerItemSlice"
import customerItemReviewsSlice from "../slices/customer/CustomerItemReviewsSlice"
import customerCartSlice from "../slices/customer/CustomerCartSlice"
import customerOrdersSlice from "../slices/customer/CustomerOrdersSlice"
import customerProfileSlice from "../slices/customer/CustomerProfileSlice"


const store = configureStore({
    reducer: {
        //common slices
        'themeStore': themeSlice,

        //seller slices
        'sellerOrderStore': sellerOrderSlice,
        'sellerItemsStore': sellerItemsSlice,
        'sellerSingleItemStore': sellerSingleItemSlice,
        'sellerItemReview': sellerItemReviewSlice,
        'sellerProfileStore': sellerProfileSlice,
        'sellerDashboardStore': sellerDashboardSlice,

        //customer slices
        'customerItemsStore': customerItemsSlice,
        'customerItemStore': customerItemSlice,
        'customerItemReviewsStore': customerItemReviewsSlice,
        'customerCartStore': customerCartSlice,
        'customerOrdersStore': customerOrdersSlice,
        'customerProfileStore': customerProfileSlice
    }
})




export default store