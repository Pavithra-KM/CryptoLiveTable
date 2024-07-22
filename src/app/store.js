import { configureStore } from '@reduxjs/toolkit';
import liveDataReducer from '../liveDataSlice';

export const store = configureStore({
    reducer: {
        liveCryptoData: liveDataReducer
    }
});