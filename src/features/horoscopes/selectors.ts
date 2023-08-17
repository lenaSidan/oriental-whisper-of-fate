import { RootState } from '../../app/store';
import Horoscope from './types/Horoscope';

export const selectHoroscopes = (state: RootState): Horoscope[] =>
	state.horoscopes.horoscopes;
export const selectFiltered = (state: RootState): Horoscope[] =>
	state.horoscopes.filtered;
