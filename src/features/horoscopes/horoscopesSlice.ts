import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HoroscopesState from './types/HoroscopesState';
import * as api from './api';

const initialState: HoroscopesState = {
	horoscopes: [],
	filtered: [],
};

export const loadHoroscopes = createAsyncThunk(
	'horoscopes/loadHoroscopes',
	() => api.getAll()
);

export const horoscopesSlice = createSlice({
	name: 'horoscopes',
	initialState,
	reducers: {
		getHoroscopesBySearchWord: (state, action: PayloadAction<string>) => {
			state.filtered = state.horoscopes.filter((horoscope) => {
				let isWord = false;
				horoscope.tags.forEach((tag) => {
					if (tag === action.payload) {
						isWord = true;
					}
				});
				return isWord;
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadHoroscopes.fulfilled, (state, action) => {
			state.horoscopes = action.payload.horoscopes;
		});
	},
});

export default horoscopesSlice.reducer;
export const { getHoroscopesBySearchWord } = horoscopesSlice.actions;
