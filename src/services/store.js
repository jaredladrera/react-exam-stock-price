import { configureStore } from '@reduxjs/toolkit';
import stockSlice from './features/stock.slice';

// this is the state provider
export const store = configureStore({
    reducer: {
        stocks: stockSlice.reducer
    }
})