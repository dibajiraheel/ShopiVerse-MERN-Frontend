import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import GetItemReviews from "../api/GetItemReviews"


const initialState = {
    // isLoading: false,
    // error: false,
    
    reviews: {

    }
}

// const FetchItemReviews = createAsyncThunk('FetchItemReview', async (itemId) => {
//     const response = await GetItemReviews(itemId)
//     console.log('REVIEWS RESPONSE GOT', response[0]);
    
//     if (response.length == 0 || response.interaction.length == 0) return {'itemId': itemId, 'reviewsFound': 0}
//     return response[0]
// })

const sellerItemReviewSlice = createSlice({
    name: 'sellerItemReviewSlice',
    initialState,
    reducers: {
        'AddItemReviews': (state, action) => {
            const currentReviews = state.reviews

            const reviewsReceived = action.payload
            const itemId = reviewsReceived.itemId
            if (reviewsReceived.reviewsFound == 0) {
                
                state.reviews = {...currentReviews, [itemId]: []}
                return
            
            }
            else {

                state.reviews = {...currentReviews, [itemId]: reviewsReceived}
                return
            }

        },
        'ResetSellerItemReviewSlice': (state, action) => {
            state.reviews = {}
            return
        }
    }

})


export default sellerItemReviewSlice.reducer

export const { AddItemReviews, ResetSellerItemReviewSlice } = sellerItemReviewSlice.actions 





