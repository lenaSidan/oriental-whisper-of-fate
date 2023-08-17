import { RootState } from '../../app/store';
import Prediction from './types/Prediction';

export const selectPrediction = (state: RootState): Prediction | null =>
	state.predictions.prediction;

export const selectLoading = (state: RootState): boolean =>
	state.predictions.loading;

export const selectError = (state: RootState): string | null =>
	state.predictions.error;
