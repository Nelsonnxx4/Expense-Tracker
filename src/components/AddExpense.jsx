// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import {
  ArrowDownOutline,
  PricetagOutline,
  RefreshOutline,
} from "react-ionicons";
import TagList from "./TagList";
import Confirm from "./Confirm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closePopup } from "../store/slices/addExpenseSlice";
import { openTagList } from "../store/slices/tagSlice";
import { setConfirmation as setConfirmationAction, setSelected as setSelectedAction } from "../store/slices/confirmSlice";
import { setTransactionAmount as setTransactionAmountAction } from "../store/slices/transactionSlice";

const AddExpense = () => {
  const dispatch = useAppDispatch();
  const isTagOpen = useAppSelector((state) => state.tag.isTagOpen);
  const handleOpenTagList = () => dispatch(openTagList());
  const [date, setDate] = useState(new Date());
  const handleClosePopup = () => dispatch(closePopup());
  const confirmation = useAppSelector((state) => state.confirm.confirmation);
  const selected = useAppSelector((state) => state.confirm.selected);
  const setConfirmation = (value) => dispatch(setConfirmationAction(value));
  const setSelected = (value) => dispatch(setSelectedAction(value));
  const transactionAmount = useAppSelector(
    (state) => state.transaction.transactionAmount
  );
  const setTransactionAmount = (value) =>
    dispatch(setTransactionAmountAction(value));

  const handleOpenConfirmation = () => {
    if (!selected || !transactionAmount) {
      toast.error("Please select a tag or an amount");
    } else {
      setConfirmation(true);
    }
  };
  const handleSelect = (item) => {
    setSelected(item);
  };
  if (isTagOpen)
    return (
      <>
        <TagList onSelect={handleSelect} />
      </>
    );
  if (confirmation)
    return (
      <>
        <Confirm
          transactionAmount={transactionAmount}
          setTransactionAmount={setTransactionAmount}
        />
      </>
    );
  return (
    <>
      <Toaster richColors Error position="top-right" />
      <section className="flex justify-center text-slate-400 items-center flex-col fixed text-xl  z-10 h-full bg-white bg-opacity-70 backdrop-blur-sm -mr-4 bottom-2/3 dark:bg-black dark:bg-opacity-60 dark:text-white w-full  translate-y-2/3 translate-x-0 sm:w-full sm:translate-x-1/4 md:w-full md:translate-x-1/2 lg:w-2/5 lg:translate-x-3/4 transition ease-linear">
        <div>
          <p className="text-lg text-center font-thin">
            Today at {date.toDateString()}
          </p>
          <input
            type="number"
            placeholder="0"
            min={0}
            required
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            className="border-b border-zinc-200 bg-transparent outline-none text-center text-5xl w-72 my-5 font-bold text-black dark:text-slate-200"
          />
        </div>
        <div className="flex justify-center items-center flex-col ">
          <ArrowDownOutline
            color="#4A5568"
            height="100%"
            width="30px"
            className="py-8 "
          />
          <div
            className="flex justify-between items-center space-x-3 cursor-pointer hover:scale-110 transition-all "
            onClick={handleOpenTagList}
          >
            {selected ? (
              <div className="flex flex-row space-x-3">
                <span>{selected.emoji}</span>
                <span>{selected.value}</span>
                <RefreshOutline color="#4A5568" height="30px" width="30px" />
              </div>
            ) : (
              <>
                <PricetagOutline color="#4A5568" height="30px" width="30px" />
                <span className="text-lg">select your tag</span>
                <RefreshOutline color="#4A5568" height="30px" width="30px" />
              </>
            )}
          </div>
        </div>
        <div className="py-10 space-x-5 flex">
          <button
            className="bg-red-200 dark:bg-red-400 px-8 py-2 rounded-md hover:tracking-wider transition-all hover:shadow-md"
            onClick={handleClosePopup}
          >
            Cancel
          </button>
          <button
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-md hover:tracking-wider transition-all hover:shadow-md"
            onClick={handleOpenConfirmation}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
