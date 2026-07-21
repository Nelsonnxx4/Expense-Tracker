import Header from "../components/Header";
import Footer from "../components/Footer";
import ChartAnalytics from "../components/ChartAnalytics";

const Summary = () => {
  return (
    <section>
      <div className=" bg-white h-screen  dark:bg-black dark:text-white transition ease-linear drop-shadow-xl sm:max-w-lg mx-auto">
        <Header />
        <div className="flex justify-center items-center flex-col">
          {/* <p className="text-3xl">working on implementing the chart...</p> */}
          <ChartAnalytics />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Summary;
