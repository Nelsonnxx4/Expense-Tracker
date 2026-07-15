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

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    expenses: 0.0,
  });
  const [dayTotal, setDayTotal] = useState(null);

  // FUNCTIONALITY FOR A DAY SPENDING
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [isTransactionAvailable, setIsTransactionAvailable] = useState(false);
  const dispatch = useAppDispatch();
  const setIsLoading = (value) => dispatch(setTagIsLoading(value));

  const transColRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transColRef,
        where("userID", "==", userID, "createdAt", ">=", today),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          totalExpenses += Number(data.transactionAmount);

          console.log(totalExpenses);
        });
        setDayTotal(totalExpenses);
        setTransactions(docs);
        setIsTransactionAvailable(transactions);
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
  }, []);

  return { transactions, transactionTotal, isTransactionAvailable, dayTotal };
};
