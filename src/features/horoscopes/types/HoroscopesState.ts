import Horoscope from './Horoscope';

export default interface HoroscopesState {
	horoscopes: Horoscope[];
	filtered: Horoscope[];
}
