import { Link } from "react-router-dom";
import { Person, PieChartOutline } from "react-ionicons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openPopup } from "../store/slices/addExpenseSlice";
import AddExpense from "./AddExpense";
const Footer = () => {
	const darkMode = useAppSelector((state) => state.darkMode.darkMode);
	const popupAddExpense = useAppSelector(
		(state) => state.addExpense.popupAddExpense
	);
	const dispatch = useAppDispatch();
	const handleOpenPopup = () => dispatch(openPopup());

	if (popupAddExpense)
		return (
			<>
				<AddExpense />
			</>
		);

	return (
		<section className=" dark:bg-black dark:text-white transition ease-linear mx-auto flex justify-center">
		<footer className="dark:bg-black dark:text-white transition ease-linear bg-white fixed bottom-0  flex justify-between items-center py-5 px-4 w-full sm:w-2/5 md:w-2/5  border-t-slate-300 border-t">
			<Link to="/analytics">
				<div className=" flex flex-col  items-center cursor-pointer">
					<PieChartOutline
						color={darkMode ? "#fff" : "#4A5568"}
						height="35px"
						width="35px"
						className={`hover:scale-100 transition-all ${
							darkMode ? "dark ionicon-color" : "ionicon-color"
						}`}
					/>
					<p className="text-slate-400">Analytics</p>
				</div>
			</Link>
			<Link to="/home">
				<div
					className="flex justify-center items-center bg-yellow-300 px-2 rounded-3xl cursor-pointer w-12 h-12 dark:text-black "
					onClick={handleOpenPopup}
				>
					<span className="text-4xl font-thin hover:text-5xl transition-all">
						+
					</span>
				</div>
			</Link>
			<Link to="/profile">
				<div className="flex flex-col  cursor-pointer">
					<Person
						color={darkMode ? "#fff" : "#4A5568"}
						height="2.5rem"
						width="2.5rem"
						className={darkMode ? "dark ionicon-color" : "ionicon-color"}
					/>
					<p className="text-slate-400">profile</p>
				</div>
			</Link>
		</footer>
						</section>
	);
};

export default Footer;
