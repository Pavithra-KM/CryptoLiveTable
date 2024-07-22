import { createSlice } from '@reduxjs/toolkit';

export const liveDataSlice = createSlice({
    name: 'liveCryptoData',
    initialState: {
        cryptoName: "",
        liveCryptoData: [],
        status: false
    },
    reducers: {
        setLiveCryptoData: (state, action) => {
            state.liveCryptoData = action.payload;
        },
        setCryptoName: (state, action) => {
            state.cryptoName = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setLiveCryptoData, setCryptoName, setStatus } = liveDataSlice.actions;

export default liveDataSlice.reducer;