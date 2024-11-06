import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import React from "react";
import "./sidebar.css";
import { MdSpaceDashboard } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
const Sidebar = () => {
    const location = useLocation();
  return (
    <>
      <nav className="col-md-3 col-lg-2 d-md-block sidebar">
       <div className="block_logo">
       <img
          src="/src/assets/images/logo.png"
          alt=""
          className="logo"
        />
       </div>
        <div className="position-sticky">
          <div className="nav flex-column">
          <Link
              className={`nav-link ${location.pathname.includes("/admin/dashboard") ? "active" : ""}`}
              to="/admin/dashboard"
            >
              <div className={`nav-item ${location.pathname.includes("/admin/dashboard") ? "active" : ""}`}>
                {/* <MdSpaceDashboard /> */}
                Dashboard
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname.includes("/admin/san") ? "active" : ""}`}
              to="/admin/san"
            >
              <div className={`nav-item ${location.pathname.includes("/admin/san") ? "active" : ""}`}>
                {/* <GiSoccerField /> */}
                Sân
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname.includes("/admin/quyen") ? "active" : ""}`}
              to="/admin/quyen"
            >
              <div className={`nav-item ${location.pathname.includes("/admin/quyen") ? "active" : ""}`}>
                Nhóm quyền
              </div>
            </Link>

            <Link
              className={`nav-link ${location.pathname.includes("/admin/nguoidung") ? "active" : ""}`}
              to="/admin/nguoidung"
            >
              <div className={`nav-item ${location.pathname.includes("/admin/nguoidung") ? "active" : ""}`}>
                Người dùng
              </div>
            </Link>

            <Link
              className={`nav-link ${location.pathname.includes("/admin/coupons") ? "active" : ""}`}
              to="/admin/coupons"
            >
              <div className={`nav-item row ${location.pathname.includes("/admin/coupons") ? "active" : ""}`}>
                {/* <GiSoccerField /> */}
                Khuyến mãi
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname.includes("/admin/invoices") ? "active" : ""}`}
              to="/admin/invoices"
            >
              <div className={`nav-item row ${location.pathname.includes("/admin/invoices") ? "active" : ""}`}>
                {/* <GiSoccerField /> */}
                Hóa đơn
              </div>
            </Link>
            <Link
              className={`nav-link ${location.pathname.includes("/admin/bookings") ? "active" : ""}`}
              to="/admin/bookings"
            >
              <div className={`nav-item row ${location.pathname.includes("/admin/bookings") ? "active" : ""}`}>
                {/* <GiSoccerField /> */}
                Booking
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
