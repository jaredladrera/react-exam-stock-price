import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAvailableStock = createAsyncThunk('stock/getAvailable', async (_, { rejectWithValue }) => {
    
    const options = {
        method: 'GET',
        url: 'https://real-time-stock-finance-quote.p.rapidapi.com/stock',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
          'x-rapidapi-host': 'real-time-stock-finance-quote.p.rapidapi.com'
        }
      };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch(error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }

});

export const getAvailableStockByTicker = createAsyncThunk('stock/getAvailableByTicker', async(ticker, {rejectWithValue}) => {
    

    try {
        const queryString = ticker.join(',');
        const options = {
            method: 'GET',
            url: `https://real-time-stock-finance-quote.p.rapidapi.com/stock/price/${queryString}`,
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
              'x-rapidapi-host': 'real-time-stock-finance-quote.p.rapidapi.com'
            }
          };
        const { data } = await axios.request(options);

        return data;
    } catch(error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const stockSlice = createSlice({
    name: 'stocks',
    initialState: {
        allStock: [],
        stockDetails: [],
        success: false,
        loading: false,
        message: ''
    },
    reducers: {},
    // for monitoring data status from api
    extraReducers(builder) {
        builder
        .addCase(getAvailableStock.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAvailableStock.fulfilled, (state, action) => {
            state.allStock = action.payload;
            state.loading = false;
            state.success = true;
        })
        .addCase(getAvailableStock.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(getAvailableStockByTicker.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAvailableStockByTicker.fulfilled, (state, action) => {
            state.stockDetails = action.payload;
            state.loading = false;
            state.success = true;
            action.payload.length === 0 ? state.message = 'Invalid Ticker' : state.message = ''
        })
        .addCase(getAvailableStockByTicker.rejected, (state, action) => {
            state.success = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});

export default stockSlice;