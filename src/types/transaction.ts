import type { Timestamp } from "firebase/firestore";

export interface Transaction {
	id: string;
	userID: string;
	emoji: string;
	value: string;
	transactionAmount: number;
	createdAt: Timestamp;
}

export interface TransactionTotal {
	expenses: number;
}
