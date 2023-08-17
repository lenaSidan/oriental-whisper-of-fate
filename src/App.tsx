import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout/Layout';
import Home from './components/Home/Home';
import PredictionsList from './features/predictions/PredictionsList';
import HoroscopesList from './features/horoscopes/HoroscopesList';

function App(): JSX.Element {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="predictions" element={<PredictionsList />} />
				<Route path="horoscopes" element={<HoroscopesList />} />
			</Route>
		</Routes>
	);
}

export default App;
