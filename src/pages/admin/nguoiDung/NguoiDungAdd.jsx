import React, { useState, useEffect } from 'react';
import './nguoiDungAdd.scss';
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Select, notification } from 'antd';
import { getAllQuyen } from '../../../services/quyenService';
import { GradientButton, GradientButtonBack } from '../../../components/Admin/GradientButton';
import { themNguoiDung } from '../../../services/nguoiDungService';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const NguoiDungAdd = () => {
    const navigate = useNavigate();
    const [quyen, setQuyen] = useState([]);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [selectedQuyen, setSelectedQuyen] = useState("");
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [errorFullname, setErrorFullname] = useState("")



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

    const handleBack = () => {
        navigate('/admin/nguoidung');
    };

    const handleAddUser = async () => {
        // Reset all error messages before validating
        setErrorEmail("");
        setErrorPhone("");
        setErrorFullname("");

        if (password !== rePassword) {
            notification.error({ message: 'Mật khẩu không khớp' });
            return;
        }

        if (!password || !fullName || !email || !phone || !selectedQuyen) {
            notification.error({ message: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }

        const data = {
            fullName,
            email,
            password,
            rePassword,
            phone,
            status,
            roleIdList: [selectedQuyen]
        };

        try {
            const resp = await themNguoiDung(data);
            notification.success({ message: 'Thêm người dùng thành công' });
            navigate('/admin/nguoidung');
            // console.log("resp: ", resp);
        } catch (error) {
            const validationErrors = error.response?.data?.data || {};

            // Set specific error messages for each field if validation fails
            if (validationErrors.email) {
                setErrorEmail(validationErrors.email);
            }
            if (validationErrors.phone) {
                setErrorPhone(validationErrors.phone);
            }
            if (validationErrors.fullName) {
                setErrorFullname(validationErrors.fullName);
            }
           

            // Optional: display a notification if there are validation errors
            notification.error({
                message: 'Lỗi khi thêm người dùng',
                description: 'Vui lòng kiểm tra lại thông tin nhập vào.'
            });
        }
    };

    return (
        <div className='add_nguoiDung'>
            <h1 className='title'>Thêm người dùng</h1>
            <div className='form-them_nguoiDung'>
                <div className="flex_form">
                    <div className='form-left'>
                        <div className='block_input'>
                            <label className='label'>Email</label>
                            <div className='w-300'>
                                <Input
                                    placeholder="Nhập email người dùng"
                                    prefix={<MailOutlined />}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errorEmail && <span className='error'>{errorEmail}</span>}
                        </div>
                        <div className='block_input'>
                            <label className='label'>Password</label>
                            <div className='w-300'>
                                <Input.Password
                                    placeholder="Nhập password người dùng"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='block_input'>
                            <label className='label'>Nhập lại Password</label>
                            <div className='w-300'>
                                <Input.Password
                                    placeholder="Nhập lại password người dùng"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
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
                                        <Option key={e.idQuyen} value={e.idQuyen}>
                                            {e.tenQuyen}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='form_right'>
                        <div className='block_input'>
                            <label className='label'>Họ tên</label>
                            <div className='w-300'>
                                <Input
                                    placeholder="Nhập họ tên người dùng"
                                    prefix={<UserOutlined />}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            {errorFullname && <span className='error'>{errorFullname}</span>}
                        </div>

                        <div className='block_input'>
                            <label className='label'>Phone</label>
                            <div className='w-300'>
                                <Input
                                    placeholder="Nhập số điện thoại người dùng"
                                    prefix={<PhoneOutlined />}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            {errorPhone && <span className='error'>{errorPhone}</span>}
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
                    <div onClick={handleAddUser}><GradientButton /></div> {/* Save Button */}
                </div>
            </div>
        </div>
    );
};

export default NguoiDungAdd;