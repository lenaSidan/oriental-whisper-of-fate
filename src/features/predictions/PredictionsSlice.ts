import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPredictionById } from './api';
import { PredictionsState } from './types/PredictionsState';

export const fetchPredictionAsync = createAsyncThunk(
	'predictions/fetchPrediction',
	async (id: number) => {
		const response = await fetchPredictionById(id);
		return response;
	}
);

const initialState: PredictionsState = {
	prediction: null,
	loading: false,
	error: null,
};

const predictionsSlice = createSlice({
	name: 'predictions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPredictionAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPredictionAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.prediction = action.payload;
			})
			.addCase(fetchPredictionAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch prediction';
			});
	},
});

export default predictionsSlice.reducer;
