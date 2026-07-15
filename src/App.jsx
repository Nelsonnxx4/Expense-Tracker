// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnalyticPage from "./pages/AnalyticPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Error from "./pages/Error";
import { useAppSelector } from "./store/hooks";

const App = () => {
	const darkMode = useAppSelector((state) => state.darkMode.darkMode);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", darkMode);
	}, [darkMode]);

	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/analytics" element={<AnalyticPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>
	);
};

export default App;
