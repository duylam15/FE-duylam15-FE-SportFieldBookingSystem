import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from '../pages/Home';
import Error from '../pages/Error';
import UsersPage from "../pages/UserPage";
import FieldList from "../pages/FieldList";
import FieldDetails from "../pages/FieldDetails";
import Dashboard from "../pages/admin/dashboard";
import San from "../pages/admin/San";
import Quyen from "../pages/admin/Quyen";
import LayoutAdmin from "../pages/admin/layoutAdmin";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Coupon from "../components/Coupon/index"
import InvoiceTable from '../components/Invoice/index';
import Booking from "../components/Booking";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPasswors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Hiển thị Layout cho các route này
    errorElement: <Error />, // Hiển thị NotFound khi có lỗi
    children: [
      { index: true, element: <Home /> },
      {
        path: "fieldList",
        element: <FieldList />
      },
      {
        path: "fieldDetails/:id",
        element: <FieldDetails />
      }
    ]
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />, // Route register, hiển thị Register
  },
  {
    path: "/register",
    element: <Register />, // Route register, hiển thị Register
  },
  {
    path: "/forgot_password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
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
      { path: "san", element: <San /> }  ,            // Route con của admin
      { path: "coupons", element: <Coupon /> },
      { path: "invoices", element: <InvoiceTable /> },
      { path: "bookings", element: <Booking /> },
    ]
  },
]); 