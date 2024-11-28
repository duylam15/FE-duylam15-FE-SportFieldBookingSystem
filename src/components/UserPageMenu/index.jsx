import React from "react";
import "./UserPageMenu.scss";
import HumanIcon from "./icon/HumanIcon";
import { FaSocks } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserPageMenu = () => {
  const navigate = useNavigate()
  return (
    <div className="user-menu">
      <div className="user-menu__header">
        <div className="user-menu__avatar">NL</div>
        <div className="user-menu__title">Tài khoản của tôi</div>
      </div>
      <div className="user-menu__list">
        <div className="user-menu__item" onClick={() => { navigate("/my_profile") }}>
          <div className="user-menu__item-icon">
            <HumanIcon />
          </div>
          <span className="user-menu__item-title">Thông tin tài khoản</span>
        </div>
        <div className="user-menu__item" onClick={() => { navigate("/my_profile/historyBook") }}>
          <div className="user-menu__item-icon">
            <FaSocks />
          </div>
          <span className="user-menu__item-title">Lịch sử đặt sân</span>
        </div>
      </div>
    </div>
  );
};

export default UserPageMenu;