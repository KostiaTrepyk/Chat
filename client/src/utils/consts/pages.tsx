import ChatsPage from "../../pages/chats.page/chats.page";
import HomePage from "../../pages/home.page/home.page";
import AuthorizationPage from "../../pages/authorization.page/authorization.page";
import LogoutPage from "../../pages/logout.page/logout.page";

export const privatePages = [
	{
		id: 0,
		name: "Home",
		path: "/",
		element: <HomePage />,
	},
	{
		id: 1,
		name: "Chats",
		path: "/chats",
		element: <ChatsPage />,
	},
	{
		id: 2,
		name: "Logout",
		path: "/logout",
		element: <LogoutPage />,
	},
];

export const publicPages = [
	{
		id: 0,
		name: "Home",
		path: "/",
		element: <HomePage />,
	},
	{
		id: 1,
		name: "Login",
		path: "/login",
		element: <AuthorizationPage />,
	},
];
