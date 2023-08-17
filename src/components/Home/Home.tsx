import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home(): JSX.Element {
	return (
		<div className={styles.containerHome}>
			<div className={styles.containerText}>
				<div className={styles.box}>
					<div className={styles.text}>
						<p>
							<Link to="/predictions" className={styles.linkStyle}>
								<h2>Предсказания — </h2>
							</Link>
						</p>
						<p>
							это проекция прошлого на будущее, но оно всегда не определенно.
						</p>
					</div>
					<div className={styles.text}>
						<p>
							<Link to="/horoscopes" className={styles.linkStyle}>
								<h2>Гороскопы —</h2>
							</Link>
						</p>
						<p>
							символические интерпретации, предлагающие направления, но не
							являющиеся абсолютной истиной.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
