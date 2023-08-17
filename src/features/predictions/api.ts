import Prediction from './types/Prediction';

export async function fetchPredictionById(id: number): Promise<Prediction> {
	const res = await fetch('https://lenasidan.github.io/predictions/data.json');
	if (!res.ok) {
		throw new Error('Ошибка при получении предсказания');
	}
	const data: Prediction[] = await res.json();
	const prediction = data.find((p) => p.id === id);

	if (!prediction) {
		throw new Error(`предсказание  ${id} не найдено`);
	}
	return prediction;
}
