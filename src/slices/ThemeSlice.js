import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    'mode': 'dark'
}


const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        'ChangeTheme': (state, action) => {
            if (state.mode == 'dark' && action.payload == 'light') state.mode = 'light'
            else state.mode = 'dark'
        }
    }
})


export const {ChangeTheme} = themeSlice.actions


export default themeSlice.reducer