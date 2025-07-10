import { createSlice } from "@reduxjs/toolkit";

const scanSlice = createSlice({
  name: "scan",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    setScanLoading: (state, action) => {
      state.loading = action.payload;
    },
    setScanResult: (state, action) => {
      state.result = action.payload;
      state.error = null;
    },
    setScanError: (state, action) => {
      state.error = action.payload;
      state.result = null;
    },
    clearScanResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
});

export const {
  setScanLoading,
  setScanResult,
  setScanError,
  clearScanResult,
} = scanSlice.actions;

export default scanSlice.reducer;
