import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    focutInput: false,
    expenses : []
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setFocusInput: (state, action) => {
            state.focutInput = action.payload;
        },
        setExpenses : (state , action) => {
            state.expenses = action.payload
        }
    }
})

export const { setFocusInput , setExpenses } = configure.actions

export default configure.reducer