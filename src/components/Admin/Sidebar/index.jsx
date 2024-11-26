import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import EditBtn from '../ColorButtons/EditBtn';
import XemChiTietBtn from '../ColorButtons/XemChiTietBtn.jsx';
import { getMyProfile } from "../../../services/myProfileService.js";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SportsIcon from '@mui/icons-material/Sports';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// Function to check if a specific permission exists for a feature
const hasPermission = (featureName, action) => {
  const dataNguoiDung = JSON.parse(localStorage.getItem("dataNguoiDungSport"))
  const chiTietQuyenDTOList = dataNguoiDung?.role?.rolePermissionDTOList || [];
  const permissionsArray = chiTietQuyenDTOList.map(
    (permission) => `${permission.permissionName}:${permission.action}`
  );
  const permissionSet = new Set(permissionsArray);

  return permissionSet.has(`${featureName}:${action}`);
};


const PermissionAddButton = ({ feature, children }) => { // ẩn hoặc hiện nút thêm theo tên chức năng
  const isAllowed = hasPermission(feature, "CREATE");
  return isAllowed ? children : null;
};

export { PermissionAddButton }


const PermissionEditButton = ({ feature, children }) => { // ẩn hoặc hiện nút sửa theo tên chức năng
  const isAllowed = hasPermission(feature, "EDIT");
  return isAllowed ? children : null;
};

export { PermissionEditButton }


const PermissionButton = ({ feature, idButton, onEdit }) => {  // cái nào mà có lồng tính năng xem chi tiết
  const hasEditPermission = hasPermission(feature, "EDIT"); // trong nút sửa thì phải dùng cái này
  const hasViewPermission = hasPermission(feature, "VIEW"); // cách dùng mẫu xem file phan quyen admin, user admin

  if (hasEditPermission) {
    return (
      <div onClick={() => onEdit(idButton)}>
        <EditBtn />
      </div>
    );
  }

  if (hasViewPermission) {
    return (
      <div onClick={() => onEdit(idButton)}>
        <XemChiTietBtn />
      </div>
    );
  }

  return null;
};

export { PermissionButton };


// Component to display a menu item if the user has permission to view it
const SidebarItem = ({ path, feature, icon, name }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(path);

  if (!hasPermission(feature, "VIEW")) return null;

  return (
    <Link className={`nav-link ${isActive ? "active" : ""}`} to={path}>
      <div className={`nav-item ${isActive ? "active" : ""}`}>
        {icon}
        {name}
      </div>
    </Link>
  );
};

// Sidebar component
const Sidebar = () => {
  const menuItems = [
    { name: "Thống kê", path: "/admin/thongke", feature: "Quản lí thống kê", icon: <MdSpaceDashboard /> },
    { name: "Nhóm quyền", path: "/admin/quyen", feature: "Quản lí nhóm quyền", icon: <AcUnitIcon /> },
    { name: "Người dùng", path: "/admin/nguoidung", feature: "Quản lí người dùng", icon: <PeopleIcon /> },
    { name: "Loại sân", path: "/admin/loaisan", feature: "Quản lí loại sân", icon: <SportsIcon />},
    { name: "Sân", path: "/admin/san", feature: "Quản lí sân", icon: <GiSoccerField /> },
    { name: "Khuyến mãi", path: "/admin/coupons", feature: "Quản lí khuyến mãi", icon: <GiSoccerField /> },
    { name: "Hóa đơn", path: "/admin/invoices", feature: "Quản lí hoá đơn", icon: <ReceiptIcon /> },
    { name: "Booking", path: "/admin/bookings", feature: "Quản lí booking", icon: <ConfirmationNumberIcon /> },
  ];

  return (
    <nav className="col-md-3 col-lg-2 d-md-block sidebar">
      <div className="block_logo">
        <img src="/src/assets/images/logo.png" alt="" className="logo" />
      </div>
      <div className="position-sticky">
        <div className="nav flex-column">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              path={item.path}
              feature={item.feature}
              icon={item.icon}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;