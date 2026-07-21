import Header from "../components/Header";
import Footer from "../components/Footer";
import { useGetUserInfo } from "../hooks/useGetUserInfo";

const ProfilePage = () => {
	const {name, profilePhoto}= useGetUserInfo();
	return (
		<section>

		<div className=" bg-white h-screen  dark:bg-black dark:text-white transition ease-linear drop-shadow-xl sm:max-w-lg mx-auto">
			<Header />
				<h1 className="text-xl pl-3 pb-3">profile</h1>
				<div className="flex justify-between items-center flex-row px-3">
				<img src={profilePhoto ?? undefined} alt="profilephoto" className="rounded-full h-16"/>
				<h2>{name}</h2>
				</div>
		</div>
			<Footer />
		</section>
	);
};

export default ProfilePage;
