import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowBackCircleOutline } from "react-ionicons";
import { db } from "../firebase/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeCreateTag } from "../store/slices/createTagSlice";
import { setIsLoading as setTagIsLoading } from "../store/slices/tagSlice";
import { addDoc, collection } from "firebase/firestore";
import Spinner from "./Spinner";
import { Toaster, toast } from 'sonner'
const CreateTag = () => {
	const dispatch = useAppDispatch();
	const handleCloseCreateTag = () => dispatch(closeCreateTag());
	const darkMode = useAppSelector((state) => state.darkMode.darkMode);
	const isLoading = useAppSelector((state) => state.tag.isLoading);
	const setIsLoading = (value: boolean) => dispatch(setTagIsLoading(value));
	const [tag, setTag] = useState({
		emoji: "",
		value: ""
	});
	const [, setIsAdding] = useState(false);
	// ADD TAG TO FIREBASE

	const addTag = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(false);
		setIsAdding(true);
		const newTag = {
			emoji: tag.emoji.trim(),
			value: tag.value.trim()
		};
		if (!tag.emoji || !tag.value) {
			setIsAdding(false);
			toast.error("emoji and name can not be empty");
			return;
		}
		setIsLoading(true);
		const colRef = collection(db, "tags");
		addDoc(colRef, newTag).then((docRef) => {
			const docId = docRef.id;
			console.log(docId);
			toast.success("tag created");
		});
		setIsLoading(false);
		handleCloseCreateTag()
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		setTag((prev) => {
			return { ...prev, [name]: value };
		});
	};

	return (
		<section className="h-full mx-auto flex justify-center">
			<Toaster richColors position="top-right" />

		<article className=" fixed bottom-0 h-full mx-auto w-full sm:w-1/3 md:w-2/3 lg:w-1/2  dark:bg-black dark:bg-opacity-60 bg-opacity-60 backdrop-blur-lg bg-white transition ease-linear drop-shadow-2xl">
			<ArrowBackCircleOutline
				color={darkMode ? "#fff" : "#4A5568"}
				height="30px"
				width="30px"
				className={` cursor-pointer ml-8 ${
					darkMode ? "dark ionicon-color" : "ionicon-color"
				}`}
				onClick={handleCloseCreateTag}
				/>
			<div className="absolute w-full  bottom-12 pt-5 border-t border-t-zinc-200 text-xl rounded-2xl pb-10 px-5 text-slate-400 dark:bg-black bg-white md:bottom-8">
				<form
					onSubmit={addTag}
					className="flex justify-center flex-col items-center"
					>
					<h4 className="my-8">new tag</h4>
					<input
						type="text"
						placeholder="🏠 (sticker)"
						name="emoji"
						value={tag.emoji}
						onChange={handleChange}
						className="border-b border-zinc-200 bg-transparent outline-none text-center my-8"
						/>
					<input
						type="text"
						placeholder="rent (name)"
						name="value"
						value={tag.value}
						onChange={handleChange}
						className="border-b border-zinc-200 bg-transparent outline-none text-center my-8"
						/>
					<button
						type="submit"
						className="flex justify-around space-x-3 items-center bg-black dark:bg-white text-white dark:text-black px-8 py-1.5 rounded-md hover:tracking-wider transition-all hover:shadow-md"
						>
						{isLoading && <Spinner />}
						<span>Confirm</span>
					</button>
				</form>
			</div>
		</article>
						</section>
	);
};

export default CreateTag;
