import React, { useState } from "react";
import "./UserPageInfoDetail.scss";
import EmailIcon from "./icon/EmailIcon";
import SearchIcon from "./icon/SearchIcon";

const UserPageInfoDetail = ({ profile, loading, error }) => {
  const accountData = profile;
  console.log("HELLO ACC: ", accountData)
  return (
    <div className="user-info-detail">
      <span className="user-info-detail__note">Để thay đổi các thông tin không cho phép người dùng tự thay đổi, vui lòng liên hệ tổng đài 19001133 để nhận được hỗ trợ.</span>
      <span className="user-info-detail__title">Thông tin cá nhân</span>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Tên</span>
        <span className="user-info-detail__value">
          {accountData?.fullName}
        </span>
      </p>
      <span className="user-info-detail__title">Thông tin liên hệ</span>
      <div className="user-info-detail__contact-info" >
        <div className="contact-info__item contact-info__baned">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="contact-info__input email"
            value={accountData?.email}
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
    </div>
  );
};

export default UserPageInfoDetail;