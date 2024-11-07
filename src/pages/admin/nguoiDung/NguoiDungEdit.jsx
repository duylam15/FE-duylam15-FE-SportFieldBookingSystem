import React, { useState, useEffect } from 'react';
import './nguoiDungEdit.scss'
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { getAllQuyen } from '../../../services/quyenService';
import { GradientButton, GradientButtonBack } from '../../../components/Admin/GradientButton';
import { capNhatThongTinNguoiDung, getThongTinNguoiDungById } from '../../../services/nguoiDungService';
import { useNavigate, useParams } from 'react-router-dom';
import { notification } from 'antd';

const { Option } = Select;

const NguoiDungEdit = () => {
    const navigate = useNavigate()
    const [quyen, setQuyen] = useState([]);
    const { idNguoiDung } = useParams();
    const [nguoiDung, setNguoiDung] = useState({});
    const [phone, setPhone] = useState("");
    const [hoTen, setHoTen] = useState("");
    const [selectedQuyen, setSelectedQuyen] = useState("");
    const [status, setStatus] = useState("");

    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    useEffect(() => {
        const fetchQuyen = async () => {
            try {
                const allQuyen = await getAllQuyen(0, 100);
                if (allQuyen && allQuyen.data.data) {
                    setQuyen(allQuyen.data.data);
                }
            } catch (error) {
                console.error("Error fetching quyen:", error);
            }
        };
        fetchQuyen();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resultUser = await getThongTinNguoiDungById(idNguoiDung);
                const userData = resultUser.data.data;
                setNguoiDung(userData);
                setHoTen(userData.fullName);
                setPhone(userData.phone);
                setSelectedQuyen(userData.role?.tenQuyen || "");
                setStatus(userData.status || "");
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [idNguoiDung]);

    const handleBack = () => {
        navigate('/admin/nguoidung');
    };

    const handleSave = async () => {
        if(hoTen.trim().length == 0) {
            openNotificationWithIcon('error', 'Cập nhật thất bại', 'Tên người dùng được không bỏ trống!');
            return;
        }
        if(phone.trim().length != 10) {
            openNotificationWithIcon('error', 'Cập nhật thất bại', 'Số điện thoại phải 10 số');
            return;
        }
        const dataToUpdate = {
            username: nguoiDung.username,
            email: nguoiDung.email,
            phone: phone,
            fullName: hoTen,
            roleIdList: [quyen.find((e) => e.tenQuyen === selectedQuyen)?.idQuyen],
            status: status,
        };

        try {
            await capNhatThongTinNguoiDung(idNguoiDung, dataToUpdate);
            openNotificationWithIcon('success', 'Cập nhật thành công', 'Thông tin người dùng đã được cập nhật thành công.');
            navigate('/admin/nguoidung');
        } catch (error) {
            console.error("Error updating user:", error);
            openNotificationWithIcon('error', 'Cập nhật thất bại', 'Đã xảy ra lỗi khi cập nhật thông tin người dùng.');
        }
    };
    return (
        <div className='edit_page'>
            <h1 className='title'>Chỉnh sửa thông tin người dùng</h1>

            <div className='form_edit'>
                <div>
                    <div className='block_input'>
                        <label className='label'>ID: </label>
                        <span>{nguoiDung.userId || "N/A"}</span>
                    </div>
                    <div className='block_input'>
                        <label className='label'>Mã người dùng: </label>
                        <span>{nguoiDung.userCode || "N/A"}</span>
                    </div>
                    <div className='block_input'>
                        <label className='label'>User name: </label>
                        <span>{nguoiDung.username || "N/A"}</span>
                    </div>
                    <div className='block_input'>
                        <label className='label'>Email: </label>
                        <span>{nguoiDung.email || "N/A"}</span>
                    </div>
                    <div className='block_input'>
                        <label className='label'>Thời gian tạo: </label>
                        <span>{nguoiDung.thoiGianTao || "N/A"}</span>
                    </div>
                </div>
                <div>
                <div className='block_input'>
                        <label className='label'>Họ tên: </label>
                        <div className='w-300'>
                            <Input
                                placeholder="Nhập họ tên người dùng"
                                prefix={<UserOutlined />}
                                value={hoTen}
                                onChange={(e) => {setHoTen(e.target.value)}}
                            />
                        </div>
                    </div>

                    <div className='block_input'>
                        <label className='label'>Số điện thoại: </label>
                        <div className='w-300'>
                            <Input
                                placeholder="Nhập số điện thoại người dùng"
                                prefix={<PhoneOutlined />}
                                value={phone}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                    setPhone(numericValue);
                                }}
                            />
                        </div>
                    </div>

                    <div className='block_input'>
                        <label className='label'>Quyền</label>
                        <div className='w-300'>
                            <Select
                                style={{ width: 200 }}
                                placeholder="Chọn quyền"
                                onChange={(value) => setSelectedQuyen(value)}
                                value={selectedQuyen}
                            >
                                {quyen.map((e) => (
                                    <Option key={e.tenQuyen} value={e.tenQuyen}>
                                        {e.tenQuyen}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className='block_input '>
                        <label className='label'>Trạng thái</label>
                        <div className='w-300'>
                            <Select
                                value={status}
                                style={{ width: 200 }}
                                onChange={(value) => setStatus(value)}
                            >
                                <Option value="ACTIVE">Hoạt động</Option>
                                <Option value="INACTIVE">Không hoạt động</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="btn_row_last">
                <div onClick={handleBack}><GradientButtonBack /></div>
                <div onClick={handleSave}><GradientButton /></div> {/* Save Button */}
            </div>
        </div>
    );
};

export default NguoiDungEdit;