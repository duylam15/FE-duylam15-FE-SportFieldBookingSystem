// UsersPage.jsx
import React from "react";
import "./UserPage.scss";
import UserPageMenu from "../../components/UserPageMenu";
import UserPageInfoDetail from "../../components/UserPageInfoDetail";
import UserPageInfoPassword from "../../components/UserPageInfoPassword";
import { IoMdHome } from "react-icons/io";
import { useFetchProfile } from "../../utils/useFetchProfile";

const UsersPage = () => {
  const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
  const { profile, loading, error } = useFetchProfile(token); // Sử dụng custom hook
  console.log("Data myPROGUEL: ", profile)

  return (
    <div className="users-page">
      <div className="container">
        <div className="users-page__body">
          <div className="users-page__body--left">
            <UserPageMenu></UserPageMenu>
          </div>
          <div className="users-page__body--right">
            <div className="row">
              <div className="icon-home">
                <IoMdHome />
              </div>
              <div><span className="row-title">Thông tin tài khoản</span></div>
            </div>
            <UserPageInfoDetail profile={profile} loading={loading} error={error}></UserPageInfoDetail>
            <h2 className="users-page__body--right title title_2">Thay đổi mật khẩu</h2>
            <UserPageInfoPassword profile={profile} loading={loading} error={error}></UserPageInfoPassword>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
