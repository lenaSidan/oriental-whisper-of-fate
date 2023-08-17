import Horoscope from './types/Horoscope';

export async function getAll(): Promise<{ horoscopes: Horoscope[] }> {
	const res = await fetch(
		'https://lenasidan.github.io/horoscopes/horoscope.json'
	);

	return res.json();
}
