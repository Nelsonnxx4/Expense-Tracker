import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";

export type TransactionInput = {
	emoji: string;
	value: string;
	transactionAmount: number;
};

export const useAddTransaction = () => {
	const transactionCollectionRef = collection(db, "transactions");
	const { userID } = useGetUserInfo();

	const addTransaction = async ({
		emoji,
		value,
		transactionAmount,
	}: TransactionInput): Promise<void> => {
		await addDoc(transactionCollectionRef, {
			userID,
			emoji,
			value,
			transactionAmount,

			createdAt: serverTimestamp(),
		});
	};
	return { addTransaction };
};
