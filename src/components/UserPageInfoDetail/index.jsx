import React from "react";
import "./UserPageInfoDetail.scss";
import EmailIcon from "./icon/EmailIcon";
import SearchIcon from "./icon/SearchIcon";

const UserPageInfoDetail = ({ profile, loading, error }) => {
  const accountData = profile?.data; // Lấy data từ profile

  const handleGenderChange = (gender) => {
    // Handle gender change logic
    console.log(`Gender changed to: ${gender}`);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error loading account details!</div>;
  // }

  return (
    <div className="user-info-detail">
      <span className="user-info-detail__title">Thông tin cá nhân</span>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Tên</span>
        <span className="user-info-detail__value">
          {accountData?.khachHang?.hoTen}
        </span>
      </p>
      <p className="user-info-detail__row">
        <span className="user-info-detail__label">Ngày sinh</span>
        <span className="user-info-detail__value">
          {accountData?.khachHang?.ngaySinh
            ? accountData.khachHang.ngaySinh.split("T")[0]
            : ""}
        </span>
      </p>
      <p className="user-info-detail__row row_bottom">
        <span className="user-info-detail__label">Giới tính</span>
        <span className="user-info-detail__value">
          <label htmlFor="radioMale">Nam</label>
          <input
            id="radioMale"
            type="radio"
            name="gender"
            value="NAM"
            checked={accountData?.khachHang?.gioiTinh === "NAM"}
            onChange={(e) => handleGenderChange(e.target.value)}
          />
          <label htmlFor="radioFemale">Nữ</label>
          <input
            id="radioFemale"
            type="radio"
            name="gender"
            value="NU"
            checked={accountData?.khachHang?.gioiTinh === "NU"}
            onChange={(e) => handleGenderChange(e.target.value)}
          />
        </span>
      </p>
      <span className="user-info-detail__title pt-5">Thông tin liên hệ</span>
      <div className="user-info-detail__contact-info" >
      <div class="contact-info__item contact-info__baned">
          <label for="email">Email</label>
          <input
            type="email"
            class="contact-info__input email"
            // value={accountData?.khachHang?.email}
            value="lockbkbang@gmail.com"
            readOnly
          />
          <div className="contact-info__item--icon">
            <EmailIcon></EmailIcon>
          </div>
        </div>

        <div class="contact-info__item contact-info__baned">
          <label for="phone">Số điện thoại</label>
          <input
            type="tel"
            class="contact-info__input"
            // value={accountData?.khachHang?.soDienThoai}
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
