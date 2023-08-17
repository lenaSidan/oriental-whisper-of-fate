import Prediction from './Prediction';

export interface PredictionsState {
	prediction: Prediction | null;
	loading: boolean;
	error: string | null;
}
