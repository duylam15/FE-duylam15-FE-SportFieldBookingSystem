import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Error from '../pages/Error';
import UsersPage from "../pages/UserPage";
import Dashboard from "../pages/admin/dashboard";
import San from "../pages/admin/San";
import Quyen from "../pages/admin/Quyen";
import LayoutAdmin from "../pages/admin/layoutAdmin";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <LayoutDefault />, // Hiển thị Layout cho các route này
		errorElement: <Error />, // Hiển thị NotFound khi có lỗi
		children: [
			{ index: true, element: <Home /> }
		]
	},
	{
		path: "/my_profile",
		element: <UsersPage />, // Route register, hiển thị Register
	},
	{
		path: "/admin",
		element: <LayoutAdmin></LayoutAdmin>, // Route register, hiển thị Register
		errorElement: <Error></Error>,
		children: [
			{ index: true, element: <Dashboard /> }, // Route mặc định khi vào "/admin" sẽ là Dashboard
			{ path: "dashboard", element: <Dashboard /> }, // Route con của admin
			{ path: "quyen", element: <Quyen /> },         // Route con của admin
			{ path: "san", element: <San /> }              // Route con của admin
		]
	},
]);