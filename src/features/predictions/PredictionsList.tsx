import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';import { fetchPredictionAsync } from './PredictionsSlice';
import { selectError, selectLoading, selectPrediction } from './selectors';
import { AppDispatch } from '../../app/store';
import styles from './PredictionsList.module.css';

function PredictionsList(): JSX.Element {
	const dispatch: AppDispatch = useDispatch<AppDispatch>();
	const prediction = useSelector(selectPrediction);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	const [randomNumber1, setRandomNumber1] = useState<number | null>(null);
	const [randomNumber2, setRandomNumber2] = useState<number | null>(null);
	const [btn1Clicked, setBtn1Clicked] = useState(false);
	const [btn2Clicked, setBtn2Clicked] = useState(false);
	const [enteredSum, setEnteredSum] = useState<number | null>(null);
	const [userGuessedNumber, setUserGuessedNumber] = useState<number | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleCloseModal = (): void => {
		setIsModalOpen(false);
	};

	const handleCalculate = (): void => {
		if (
			randomNumber1 !== null &&
			randomNumber2 !== null &&
			enteredSum !== null
		) {
			const guessedNumber = enteredSum - (randomNumber1 + randomNumber2);
			setUserGuessedNumber(guessedNumber);

			dispatch(fetchPredictionAsync(guessedNumber))
				.then((resultAction) => {
					if (fetchPredictionAsync.fulfilled.match(resultAction)) {
						const predictionResult = resultAction.payload;
						console.log('Prediction result:', predictionResult);
						setIsModalOpen(true);
					}
				})
				.catch((innerError: Error) => {
					console.error('An error occurred:', innerError.message);
				});
		}
	};

	const handleRandomNumber1 = (): void => {
		setRandomNumber1(Math.floor(Math.random() * 100) + 1);
		setBtn1Clicked(true);
	};

	const handleRandomNumber2 = (): void => {
		setRandomNumber2(Math.floor(Math.random() * 100) + 1);
		setBtn2Clicked(true);
	};

	const handleReset = (): void => {
		window.location.reload();
	};

	return (
		<div className={styles.predictionContainer}>
			<h1>Предсказание на сегодня</h1>
			<p className={styles.text}>загадай число от 0 до 10 </p>
			<p className={styles.text}>прибавь к нему: </p>
			<p className={styles.title}>Ваше число дня</p>

			{randomNumber1 === null && (
				<button
					onClick={handleRandomNumber1}
					className={btn1Clicked ? styles.buttonClicked : styles.randomButton}
				>
					<span className={styles.buttonNumber}></span>
				</button>
			)}

			{randomNumber1 !== null && (
				<p className={styles.randomNumberText}>{randomNumber1}</p>
			)}

			<p className={styles.title}>Ваше число удачи на сегодня</p>

			{randomNumber1 !== null && randomNumber2 === null && (
				<button
					onClick={handleRandomNumber2}
					className={btn2Clicked ? styles.buttonClicked : styles.randomButton}
				>
					<span className={styles.buttonNumber}></span>
				</button>
			)}

			{randomNumber2 !== null && (
				<p className={styles.randomNumberText}>{randomNumber2}</p>
			)}
			<div className={styles.inputGroup}>
				<p className={styles.text}>Введите результат сложения</p>
				<p className={styles.text}>
					ЗАГАДАННОГО ЧИСЛА и двух Ваших счастливых чисел:{' '}
				</p>

				<input
					type="number"
					onChange={(e) => setEnteredSum(Number(e.target.value))}
					className={styles.input}
				/>
				<button onClick={handleCalculate} className={styles.button}>
					Рассчитать
				</button>
			</div>

			{loading ? (
				<div className={styles.loading}>Loading...</div>
			) : (
				<div>
					{isModalOpen && prediction && (
						<div className={styles.modal}>
							<div className={styles.modalContent}>
								{userGuessedNumber !== null && (
									<div>
										<p className={styles.text}>
											Ваше загаданное число: {userGuessedNumber}
										</p>
									</div>
								)}
								<h2 className={styles.title}>Предсказание</h2>
								<p className={styles.predictionText}>{prediction.text}</p>
								<ClearSharpIcon onClick={handleCloseModal} />
							</div>
						</div>
					)}
					{error && (
						<div>
							<p className={styles.errorText}>Error: {error}</p>
						</div>
					)}
				</div>
			)}
			<button onClick={handleReset} className={styles.button}>
				Попробуем еще раз?
			</button>
		</div>
	);
}

export default PredictionsList;
