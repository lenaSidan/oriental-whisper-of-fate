import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { getHoroscopesBySearchWord, loadHoroscopes } from './horoscopesSlice';
import { selectHoroscopes, selectFiltered } from './selectors';
import styles from './HoroscopesList.module.css';
import { useEffect, useState } from 'react';
import image1 from './images/1.png';
import image2 from './images/2.png';
import image3 from './images/3.png';
import image4 from './images/4.png';
import image5 from './images/5.png';
import image6 from './images/6.png';
import image7 from './images/7.png';
import image8 from './images/8.png';
import image9 from './images/9.png';
import image10 from './images/10.png';
import image11 from './images/11.png';
import image12 from './images/12.png';
import Horoscope from './types/Horoscope';

export default function HoroscopesList(): JSX.Element {
	const searchWords = [
		'мудрость',
		'гармония',
		'преобразование',
		'любовь',
		'интуиция',
	];
	const [word, setWord] = useState<string>('');
	const allHoroscopes = useAppSelector(selectHoroscopes);
	const filteredHoroscopes = useAppSelector(selectFiltered);
	const resetFilter = (): void => {
		setWord('');
	};
	const dispatch = useAppDispatch();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedHoroscope, setSelectedHoroscope] = useState<Horoscope | null>(
		null
	);
	const images: { [key: number]: string } = {
		1: image1,
		2: image2,
		3: image3,
		4: image4,
		5: image5,
		6: image6,
		7: image7,
		8: image8,
		9: image9,
		10: image10,
		11: image11,
		12: image12,
	};

	useEffect(() => {
		dispatch(loadHoroscopes());
	}, [dispatch]);

	useEffect(() => {
		if (word) {
			dispatch(getHoroscopesBySearchWord(word));
		}
	}, [dispatch, word]);

	const horoscopesToDisplay = word ? filteredHoroscopes : allHoroscopes;

	const openModal = (horoscope: Horoscope): void => {
		setSelectedHoroscope(horoscope);
		setIsModalOpen(true);
	};

	const closeModal = (): void => {
		setIsModalOpen(false);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Гороскоп на 2024 год</h1>
			<div className={styles.inputContainer}>
				<select
					className={styles.searchWord}
					value={word}
					onChange={(e) => setWord(e.target.value)}
				>
					<option value="">-- Выберите слово --</option>
					{searchWords.map((searchWord) => (
						<option key={searchWord} value={searchWord}>
							{searchWord}
						</option>
					))}
				</select>
				{word && <ClearSharpIcon onClick={resetFilter} />}
			</div>

			<ul className={styles.list}>
				{horoscopesToDisplay.map((horoscope) => (
					<li
						key={horoscope.id}
						className={styles.horoscope}
						onClick={() => openModal(horoscope)}
					>
						<div className={styles.imageWrapper}>
							<img
								src={images[horoscope.id]}
								alt={horoscope.title}
								className={styles.horoscopeImage}
							/>
							<div className={styles.imageTitle}>{horoscope.title}</div>
						</div>
					</li>
				))}
			</ul>

			{isModalOpen && (
				<div className={styles.modalOverlay} onClick={closeModal}>
					<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
						<h2>{selectedHoroscope?.title}</h2>
						<p>
							<h5>Общее:</h5> {selectedHoroscope?.general}
						</p>
						<p>
							<h5>Любовь: </h5> {selectedHoroscope?.love}
						</p>
						<p>
							<h5>Карьера: </h5> {selectedHoroscope?.career}
						</p>
						<p>
							<h5>Здоровье: </h5> {selectedHoroscope?.health}
						</p>
						<p>
							<h5>Совет:</h5>
							{selectedHoroscope?.advice}
						</p>
						<div className={styles.tagsContainer}>
							{selectedHoroscope?.tags.map((tag) => (
								<span key={tag} className={styles.tag}>
									{tag}
								</span>
							))}
						</div>
						<button onClick={closeModal} className={styles.closeButton}>
							Закрыть
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
