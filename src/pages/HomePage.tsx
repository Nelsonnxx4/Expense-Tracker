import Header from "../components/Header";
import AvailableBalance from "../components/AvailableBalance";
import Footer from "../components/Footer";
import Transactions from "../components/Transactions";

const HomePage = () => {
	return (
		<section className=" scroll-smooth bg-stone-100 px-2  dark:bg-slate-800   ease-linear">
		<div className="bg-white min-h-screen flex flex-col justify-between dark:bg-black dark:text-white transition ease-linear drop-shadow-xl sm:max-w-lg mx-auto">
			<div>
				<Header />
				<AvailableBalance />
				<Transactions />
			</div>
		</div>
		<Footer />
</section>			
	);
};

export default HomePage;
