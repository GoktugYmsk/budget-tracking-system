import { configureStore } from '@reduxjs/toolkit'
import configure from '../configure'

export const store = configureStore({
    reducer: {
        inputValue: configure,
    },
})