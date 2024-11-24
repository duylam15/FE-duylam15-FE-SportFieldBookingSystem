import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Error from "../pages/Error";
import UsersPage from "../pages/UserPage";
import FieldDetails from "../pages/FieldDetails";
import Dashboard from "../pages/admin/dashboard";
import San from "../pages/admin/San";
import Quyen from "../pages/admin/Quyen";
import LayoutAdmin from "../pages/admin/layoutAdmin";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPasswors";
import QuyenListOverall from "../pages/admin/Quyen/QuyenListOverall";
import QuyenThem from "../pages/admin/Quyen/QuyenThem";
import QuyenEdit from "../pages/admin/Quyen/QuyenEdit";
import BookingPage from "../pages/BookingPage";
import OrderPage from "../pages/fieldOrderPage";
import NguoiDung from "../pages/admin/nguoiDung";
import NguoiDungAdd from "../pages/admin/nguoiDung/NguoiDungAdd";
import NguoiDungEdit from "../pages/admin/nguoiDung/NguoiDungEdit";
import NguoiDungListOverral from "../pages/admin/nguoiDung/NguoiDungListOverral";
import Booking from "../components/Booking/index";
import Coupon from "../components/Coupon/index";
import Invoice from "../components/Invoice/index";
import MyProfile from "../pages/admin/myProfile";
import FieldTypePage from "../pages/FieldType";
import FieldFacilityPage from "../pages/FieldFacility";
import FieldPage from "../pages/FieldPage";
import FieldListPage from "../pages/FieldList";
import FieldFormPage from "../pages/Field/FieldForm";
import ProtectedRoute from "../components/ProtectedRoute";
import PaymentResultPage from "../components/Customer/FieldOrder/PaymentResultPage";
import FieldList from "../pages/FieldList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDefault />, // Hiển thị Layout cho các route này
    errorElement: <Error />, // Hiển thị NotFound khi có lỗi
    children: [
      { index: true, element: <Home /> },
      {
        path: "fieldList",
        element: <FieldList />,
      },
      {
        path: "fieldDetails/:id",
        element: <FieldDetails />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
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
    path: "/payment-result",
    element: <Home />, // Route register, hiển thị Register
  },
  {
    path: "/admin",
    element: <LayoutAdmin></LayoutAdmin>, // Route register, hiển thị Register
    errorElement: <Error></Error>,
    children: [
      { index: true, element: <Dashboard /> }, // Route mặc định khi vào "/admin" sẽ là Dashboard
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "my_profile",
        element: <MyProfile />,
      },
      {
        path: "quyen",
        element: <Quyen />,
        children: [
          { index: true, element: <QuyenListOverall /> },
          {
            path: "add",
            element: <QuyenThem></QuyenThem>,
          },
          {
            path: "edit/:idQuyen",
            element: <QuyenEdit></QuyenEdit>,
          },
        ],
      }, // Route con của admin// Route con của admin
      {
        path: "nguoidung",
        element: <NguoiDung></NguoiDung>,
        children: [
          { index: true, element: <NguoiDungListOverral /> },
          {
            path: "add",
            element: <NguoiDungAdd></NguoiDungAdd>,
          },
          {
            path: "edit/:idNguoiDung",
            element: <NguoiDungEdit></NguoiDungEdit>,
          },
        ],
      }, // Route con của admin
      { path: "san", element: <San /> }, // Route con của admin
      { path: "san", element: <San /> }, // Route con của admin
      { path: "bookings", element: <Booking /> },
      { path: "coupons", element: <Coupon /> },
      { path: "invoices", element: <Invoice /> },
    ],
  },
  {
    path: "/booking/:fieldId",
    element: <BookingPage />,
  },
  {
    path: "/orderpage",
    element: <OrderPage />,
    element: (
      // <ProtectedRoute>
      <OrderPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/fieldType",
    element: <FieldTypePage />,
  },
  {
    path: "/fieldFacility",
    element: <FieldFacilityPage />,
  },
  {
    path: "/fields",
    element: <FieldPage />,
  },

  {
    path: "/fields/create",
    element: <FieldFormPage />,
  },
  {
    path: "/fieldListPage",
    element: <FieldFormPage />,
  },
]);
