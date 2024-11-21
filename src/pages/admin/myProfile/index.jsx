import React from 'react';
import { useFetchProfile } from '../../../utils/useFetchProfile';
import UserPageInfoDetail from '../../../components/UserPageInfoDetail';
import UserPageInfoPassword from '../../../components/UserPageInfoPassword';

const MyProfile = () => {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
    const { profile, loading, error } = useFetchProfile(token); // Sử dụng custom hook
    return (
        <div>
            <h2 className="users-page__body--right title title_2">Thông tin tài khoản</h2>
            <UserPageInfoDetail profile={profile} loading={loading} error={error}></UserPageInfoDetail>
            <h2 className="users-page__body--right title title_2">Thay đổi mật khẩu</h2>
            <UserPageInfoPassword></UserPageInfoPassword>
        </div>
    );
};

export default MyProfile;