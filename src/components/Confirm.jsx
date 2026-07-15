// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedOutline, ArrowForwardOutline } from "react-ionicons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeConfirmation } from "../store/slices/confirmSlice";
import { closePopup } from "../store/slices/addExpenseSlice";
import { setIsLoading as setTagIsLoading } from "../store/slices/tagSlice";
import { useAddTransaction } from "../hooks/useAddTransaction";
import Spinner from './Spinner';

const Confirm = ({ transactionAmount }) => {
	const { addTransaction } = useAddTransaction();
	const dispatch = useAppDispatch();
	const selected = useAppSelector((state) => state.confirm.selected);
	const handleCloseConfirmation = () => dispatch(closeConfirmation());
	const darkMode = useAppSelector((state) => state.darkMode.darkMode);
	const handleClosePopup = () => dispatch(closePopup());
	const isLoading = useAppSelector((state) => state.tag.isLoading);
	const setIsLoading = (value) => dispatch(setTagIsLoading(value));
	const {emoji, value} = selected;
	
	const navigate= useNavigate();
	const handleAddTransaction=()=>{
		setIsLoading(true)
		addTransaction({
			emoji, value, transactionAmount
		})
		setIsLoading(false)
		navigate('/home')
		handleCloseConfirmation()
		handleClosePopup()

	}
	

	return (
		<section className="flex justify-center items-center">
		<div className=" fixed bottom-0 h-full mx-auto w-full sm:w-1/3 md:w-2/3 lg:w-1/2  dark:bg-black dark:bg-opacity-60 bg-opacity-60 backdrop-blur-lg bg-white transition ease-linear drop-shadow-2xl">
			<div className="absolute w-full bottom-24 pt-5 border-t border-t-zinc-200 rounded-2xl px-5 text-slate-400 dark:bg-black bg-white">
				<h3 className="text-3xl text-black font-bold dark:text-white">
					Confirm
				</h3>
				<div className="flex justify-between items-center space-x-5 py-5">
					<LockClosedOutline
						color="#4A5568"
						height="30px"
						width="30px"
						className="bg-slate-200 p-3 rounded-3xl hover:bg-slate-300 transition-all ease-in"
						/>
					<p className="leading-5 text-md ">
						Help us ensure accuracy by reviewing your expense before confirming
						because you can not edit transactions once made.
					</p>
				</div>
				<div className="text-black text-2xl flex justify-center items-center space-x-4 py-4">
					<span className="font-bold dark:text-white">
						${transactionAmount}
					</span>
					<ArrowForwardOutline
						color={darkMode ? "#fff" : "#000"}
						height="30px"
						width="30px"
						className={`${darkMode ? "dark ionicon-color" : "ionicon-color"}`}
						/>
					{selected && (
						<div className="flex flex-row space-x-3">
							<span>{emoji}</span>
							<span>{value}</span>
						</div>
					)}
				</div>
				<div className="flex justify-center items-center space-x-4 pb-8 pt-5">
					<button
						className="bg-red-200 dark:bg-red-400 px-8 py-2 rounded-md hover:tracking-wider transition-all hover:shadow-md text-black"
						onClick={handleCloseConfirmation}
						>
						Cancel
					</button>
					<button
						className=" flex justify-center items-center bg-black dark:bg-white text-white dark:text-black px-8 py-2 rounded-md hover:tracking-wider transition-all hover:shadow-md"
						onClick={handleAddTransaction}
						>
							<p>
							{isLoading && <Spinner/>}
							</p>
						<span>Confirm</span>
					</button>
				</div>
			</div>
		</div>
	</section>
	);
};

export default Confirm;
