import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    focutInput: false,
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setFocusInput: (state, action) => {
            state.focutInput = action.payload;
        },
    }
})

export const { setFocusInput } = configure.actions

export default configure.reducer