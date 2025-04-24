import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    reviews: []
}



const customerItemReviewsSlice = createSlice({
    name: 'customerItemReviewsSlice',
    initialState,
    reducers: {

        'AddItemReviewsInCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD REVIEW', action.payload);

            const newReviews = action.payload.reviews
            const currentReviews = state.reviews
            let allReviews
            if (newReviews.length == 0) {
                allReviews = {...currentReviews, [action.payload.itemId]: []}
            }
            else {
                allReviews = {...currentReviews, [action.payload.itemId]: newReviews}
            }

            state.reviews = allReviews
            return
            
        },

        'AddNewReivewInCustomerSlice': (state, action) => {
            console.log('PAYLOAD RECEIVED TO ADD NEW REVIEW', action.payload);

            const itemId = action.payload.newReview.itemId
            const customerId = action.payload.newReview.customerId
            const rating = Number(action.payload.newReview.rating)
            const review = action.payload.newReview.review
            const _id = action.payload.newReview._id

            const newReview = {customerId, review, rating, _id}
            
            const allReviews = state.reviews
            const currentReview = allReviews[itemId]
            currentReview.push(newReview)

            state.reviews =  {...allReviews, [itemId]: currentReview}
            return

        },

        'UpdateReviewsInCustomerSlice': (state, action) => {
            const updatedReviewsForSingleItem = action.payload.reviews
            const currentReviewsOfAllItems = state.reviews
            currentReviewsOfAllItems[action.payload.itemId] = updatedReviewsForSingleItem
            state.reviews = currentReviewsOfAllItems
        },

        'ResetItemReviewsInCustomerSlice': (state, action) => {
            state.reviews = {}
            return
        }

    }
})


export const { AddItemReviewsInCustomerSlice, AddNewReivewInCustomerSlice, ResetItemReviewsInCustomerSlice, UpdateReviewsInCustomerSlice } = customerItemReviewsSlice.actions

export default customerItemReviewsSlice.reducer



