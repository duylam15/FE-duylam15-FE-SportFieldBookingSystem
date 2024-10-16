import React, { useState } from "react";
import "./UserPageInfoDetail.scss";
import EmailIcon from "./icon/EmailIcon";
import SearchIcon from "./icon/SearchIcon";

const UserPageInfoDetail = ({ profile, loading, error }) => {
  const accountData = profile?.data; // Lấy data từ profile

  // Sử dụng state để quản lý giới tính
  const [gender, setGender] = useState(accountData?.khachHang?.gioiTinh || "NAM");

  const handleGenderChange = (newGender) => {
    setGender(newGender); // Cập nhật trạng thái giới tính
    console.log(`Gender changed to: ${newGender}`);
  };

  return (
    <div className="user-info-detail">
      <span className="user-info-detail__note">Để thay đổi các thông tin không cho phép người dùng tự thay đổi, vui lòng liên hệ tổng đài 19001133 để nhận được hỗ trợ.</span>
      <span className="user-info-detail__title">Thông tin cá nhân</span>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Tên</span>
        <span className="user-info-detail__value">
          {accountData?.khachHang?.hoTen}
        </span>
      </p>
      <p className="user-info-detail__row row_bottom">
        <span className="user-info-detail__label">Giới tính</span>
        <span className="user-info-detail__value">
          <label htmlFor="radioMale" className="cursor_point">Nam</label>
          <input
            className="cursor_point"
            id="radioMale"
            type="radio"
            name="gender"
            value="NAM"
            checked={gender === "NAM"}
            onChange={(e) => handleGenderChange(e.target.value)}
          />
          <label htmlFor="radioFemale" className="cursor_point">Nữ</label>
          <input
            className="cursor_point"
            id="radioFemale"
            type="radio"
            name="gender"
            value="NU"
            checked={gender === "NU"}
            onChange={(e) => handleGenderChange(e.target.value)}
          />
        </span>
      </p>
      <span className="user-info-detail__title pt-5">Thông tin liên hệ</span>
      <div className="user-info-detail__contact-info" >
        <div className="contact-info__item contact-info__baned">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="contact-info__input email"
            value="lockbkbang@gmail.com"
            readOnly
          />
          <div className="contact-info__item--icon">
            <EmailIcon />
          </div>
        </div>

        <div className="contact-info__item contact-info__baned">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="tel"
            className="contact-info__input"
            value="0321367819"
            readOnly
          />
        </div>
      </div>

      <div className="user-info-detail__action-row">
        <button className="user-info-detail__button user-info-detail__button--cancel">
          Loại bỏ thay đổi
        </button>
        <button className="user-info-detail__button user-info-detail__button--confirm">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default UserPageInfoDetail;