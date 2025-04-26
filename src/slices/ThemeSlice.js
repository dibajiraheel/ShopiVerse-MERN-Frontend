import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    'mode': null
}


const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        'ChangeTheme': (state, action) => {
            if (action.payload == 'light') state.mode = 'light'
            else state.mode = 'dark'
        }
    }
})


export const {ChangeTheme} = themeSlice.actions


export default themeSlice.reducer