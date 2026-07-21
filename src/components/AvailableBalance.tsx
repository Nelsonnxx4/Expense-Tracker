import { useGetTransactions } from "../hooks/useGetTransactions";

const AvailableBalance = () => {
	const { transactionTotal } = useGetTransactions();

	const { expenses } = transactionTotal;

	return (
		<section className="flex justify-center items-center flex-col space-y-3 py-12 ">
			<p className="text-slate-400 text-lg"> Spent this month</p>
			<div className=" flex items-center  justify-center space-x-2 pt-4 text-red-600 font-semi text-5xl">
				<span>
					<sup>$</sup>
				</span>
				<h1>
					<sup>-</sup>
					{expenses}
				</h1>
			</div>
		</section>
	);
};

export default AvailableBalance;
