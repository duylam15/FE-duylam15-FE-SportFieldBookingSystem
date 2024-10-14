import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Error from '../pages/Error';
import UsersPage from "../pages/UserPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutDefault />, // Hiển thị Layout cho các route này
		errorElement: <Error />, // Hiển thị NotFound khi có lỗi
		children: [
			{ index: true, element: <Home /> }
		]
	},

	// {
	// 	path: "/login",
	// 	element: <Login />, // Route login, hiển thị Login
	// },
	// {
	// 	path: "/register",
	// 	element: <Register />, // Route register, hiển thị Register
	// },
	{
		path: "/my_profile",
		element: <UsersPage />, // Route register, hiển thị Register
	}
	
]);