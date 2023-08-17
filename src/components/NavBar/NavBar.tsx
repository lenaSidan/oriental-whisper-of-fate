import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
	return (
		<nav className={styles.nav}>
			<div className={styles.linkHomeLogoContainer}>
				<NavLink className={styles.linkHome} to="/">
					Восточный шепот судьбы
					<div className={styles.subText}>Выбор всегда за тобой ...</div>
				</NavLink>
			</div>
			<div className={styles.linkContainer}>
				<NavLink className={styles.link} to="/predictions">
					Предсказания
				</NavLink>
				<NavLink className={styles.link} to="/horoscopes">
					Гороскопы
				</NavLink>
			</div>
		</nav>
	);
}
