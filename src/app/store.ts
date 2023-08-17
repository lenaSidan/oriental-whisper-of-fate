import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import predictionsReducer from '../features/predictions/PredictionsSlice';
import horoscopesReducer from '../features/horoscopes/horoscopesSlice';

export const store = configureStore({
	reducer: {
		predictions: predictionsReducer,
		horoscopes: horoscopesReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
