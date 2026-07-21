import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import { useAppDispatch } from "../store/hooks";
import { setIsLoading as setTagIsLoading } from "../store/slices/tagSlice";
import { useGetUserInfo } from "./useGetUserInfo";
import type { Transaction, TransactionTotal } from "../types/transaction";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionTotal, setTransactionTotal] = useState<TransactionTotal>({
    expenses: 0.0,
  });
  const [dayTotal, setDayTotal] = useState<number | null>(null);

  // FUNCTIONALITY FOR A DAY SPENDING
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isTransactionAvailable, setIsTransactionAvailable] = useState(false);
  const dispatch = useAppDispatch();
  const setIsLoading = (value: boolean) => dispatch(setTagIsLoading(value));

  const transColRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe: () => void = () => {};
    try {
      const queryTransactions = query(
        transColRef,
        where("userID", "==", userID),
        where("createdAt", ">=", today),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs: Transaction[] = [];
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data() as Omit<Transaction, "id">;
          const id = doc.id;

          docs.push({ ...data, id });

          totalExpenses += Number(data.transactionAmount);

          console.log(totalExpenses);
        });
        setDayTotal(totalExpenses);
        setTransactions(docs);
        setIsTransactionAvailable(docs.length > 0);
        setTransactionTotal({
          expenses: totalExpenses,
        });
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    setTimeout(() => {
      getTransactions();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);

  return { transactions, transactionTotal, isTransactionAvailable, dayTotal };
};
