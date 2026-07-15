// eslint-disable-next-line no-unused-vars
import React from "react";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useAppSelector } from "../store/hooks";
import Spinner from "./Spinner";

const Transactions = () => {
  const { transactions, isTransactionAvailable, dayTotal } =
    useGetTransactions();

  const isLoading = useAppSelector((state) => state.tag.isLoading);
  if (!isTransactionAvailable && isLoading)
    return (
      <>
        <Spinner />
      </>
    );
  if (!isTransactionAvailable)
    return (
      <div className="flex justify-center items-center">
        <p className="text-slate-400 ">No expense records yet.</p>
      </div>
    );
  if (isTransactionAvailable)
    return (
      <div className="h-max pb-28 pt-10">
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="flex flex-col px-2 sm:px-10 py-4">
            <span className="text-xl text-right">-{dayTotal}$</span>
            <>
              {transactions.map((transaction) => {
                const { index, emoji, value, transactionAmount, createdAt } =
                  transaction;

                const createdAtDate = createdAt?.toDate();
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                let displayDate;
                if (createdAtDate?.toDateString() === today?.toDateString()) {
                  displayDate = "today";
                } else if (
                  createdAtDate?.toDateString() === yesterday?.toDateString()
                ) {
                  displayDate = "yesterday";
                } else {
                  displayDate = createdAtDate?.toDateString();
                }

                return (
                  <li
                    className="flex justify-between items-center w-full space-y-2"
                    key={index}
                  >
                    <div className="flex justify-between items-center space-x-3">
                      <span className="text-4xl">{emoji}</span>
                      <p className="flex flex-col justify-center items-start space-y-0">
                        <span>{value}</span>
                        <span className="text-slate-400">{displayDate}</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-red-500">
                        -{transactionAmount}$
                      </span>
                    </div>
                  </li>
                );
              })}
            </>
          </ul>
        )}
      </div>
    );
};

export default Transactions;
