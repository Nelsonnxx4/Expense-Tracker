import type { AuthInfo } from "../types/auth";

export const useGetUserInfo = () => {
	const { name, profilePhoto, userID, isAuth }: AuthInfo = JSON.parse(
		localStorage.getItem("auth") ?? "null"
	);

	return { name, profilePhoto, userID, isAuth };
};
