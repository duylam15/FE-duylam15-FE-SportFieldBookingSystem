import React, { useEffect, useState } from 'react';
import './themQuyen.css';
import { Input, message } from 'antd';
import { GradientButton, GradientButtonBack, GradientButtonCancel } from '../../../components/Admin/GradientButton';
import { getAllChucNang, getChiTietQuyenTheoId, suaQuyen } from '../../../services/quyenService';
import { useNavigate, useParams } from 'react-router-dom';
import ChonTatCa from '../../../components/Admin/ButtonForTableQuyen/ChonTatCa';
import HuyChonTatCa from '../../../components/Admin/ButtonForTableQuyen/HuyChonTatCa';
import { Select } from 'antd';
import { PermissionEditButton } from '../../../components/Admin/Sidebar';
import { getMyProfile } from '../../../services/myProfileService';

const QuyenEdit = () => {
    const { idQuyen } = useParams();
    const [chucNang, setChucNang] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [initialPermissions, setInitialPermissions] = useState({});
    const [tenQuyen, setTenQuyen] = useState("");
    const navigate = useNavigate();
    const { Option } = Select;
    const [selectedValue, setSelectedValue] = useState(null);
    const [capNhatDataNguoiDungSport, setCapNhatDataNguoiDungSport] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const chucNangResponse = await getAllChucNang();
                setChucNang(chucNangResponse.data.data);

                const initialPermissions = chucNangResponse.data.data.reduce((acc, item) => {
                    acc[item.permissionName] = { view: false, create: false, edit: false };
                    return acc;
                }, {});
                setPermissions(initialPermissions);
                setInitialPermissions(initialPermissions);

                const quyenResponse = await getChiTietQuyenTheoId(idQuyen);
                setTenQuyen(quyenResponse.data.data.tenQuyen);
                setSelectedValue(quyenResponse.data.data.trangThaiActive);

                const updatedPermissions = { ...initialPermissions };
                quyenResponse.data.data.rolePermissionDTOList.forEach(({ permissionName, action }) => {
                    if (updatedPermissions[permissionName]) {
                        updatedPermissions[permissionName][action.toLowerCase()] = true;
                    }
                });
                setPermissions(updatedPermissions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [idQuyen]);


    const handleCheckboxChange = (tenChucNang, permissionType) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                ...prev[tenChucNang],
                [permissionType]: !prev[tenChucNang][permissionType]
            },
        }));
    };

    const handleBack = () => {
        navigate('/admin/quyen');
    };

    const handleCancel = () => {
        setPermissions(initialPermissions);
        setSelectedValue(selectedValue); // Reset the selectedValue when canceling
    };

    const selectAllRow = (tenChucNang) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: true,
                create: true,
                edit: true,
            }
        }));
    };

    const deselectAllRow = (tenChucNang) => {
        setPermissions(prev => ({
            ...prev,
            [tenChucNang]: {
                view: false,
                create: false,
                edit: false,
            }
        }));
    };

    // Function to handle the update permission
    const handleUpdatePermissions = async () => {
        if (tenQuyen.trim().length == 0) {
            message.error('Tên quyền không bỏ trống!');
            return;
        }
        const permissionsToSend = Object.entries(permissions).flatMap(([key, value]) =>
            Object.entries(value)
                .filter(([, isAllowed]) => isAllowed)
                .map(([action]) => ({
                    permissionId: chucNang.find(chucNang => chucNang.permissionName === key)?.permissionId,
                    action: action.toUpperCase()
                }))
        );

        const dataToSend = {
            roleId: idQuyen,
            roleName: tenQuyen,
            rolePermissionDTOList: permissionsToSend,
            activeEnum: selectedValue // Pass the selectedValue as activeEnum
        };
        console.log("data to send sua quyen: ", dataToSend);

        suaQuyen(dataToSend)
            .then(response => {
                if (response.data.statusCode === 200) {
                    message.success('Cập nhật quyền thành công!');
                    setCapNhatDataNguoiDungSport(true)
                } else if (response.data.statusCode === 234) {
                    message.error('Tên quyền đã tồn tại!');
                    setCapNhatDataNguoiDungSport(false)
                }
                else {
                    message.error('Nguoi code k biet loi gi. hihi');
                    setCapNhatDataNguoiDungSport(false)
                    console.log(response)
                }
            })
            .catch(error => {
                message.error('Có lỗi xảy ra khi thêm quyền.');
                setCapNhatDataNguoiDungSport(false)
                console.error("Lỗi khi thêm quyền:", error);
            });
    };

    const handleChangeSelectBox = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        const handleCapNhatDataNguoiDungSport = async () => {
            const myProfile = await getMyProfile(localStorage.getItem("accessToken")); // update data nguoi dung sau moi lan lam moi token
            localStorage.setItem(
                "dataNguoiDungSport",
                JSON.stringify(myProfile.data.data)
            );
        }
        handleCapNhatDataNguoiDungSport()
    }, [capNhatDataNguoiDungSport])

    return (
        <div className='them_quyen_container'>
            <h1 className="title">Chỉnh sửa nhóm quyền</h1>
            <div className='head_info'>
                <Input
                    placeholder="Nhập tên nhóm quyền"
                    value={tenQuyen}
                    onChange={(e) => setTenQuyen(e.target.value)}
                    disabled={idQuyen === "1" || idQuyen === "2" || idQuyen === "3"} // Vô hiệu hóa nếu idQuyen là 1 ~ admin, 2 ~ chuSan, 3 ~ Khach hang
                />
                <Select
                    value={selectedValue} // Set the value of the Select
                    style={{ width: 200 }}
                    onChange={handleChangeSelectBox}
                >
                    <Option value="ACTIVE">Hoạt động</Option>
                    <Option value="IN_ACTIVE">Không hoạt động</Option>
                </Select>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <td>Danh mục chức năng</td>
                        <td>Xem</td>
                        <td>Tạo mới</td>
                        <td>Sửa</td>
                        <td>Hành động</td>
                    </tr>
                </thead>
                <tbody>
                    {chucNang.map((item, index) => (
                        <tr key={index}>
                            <td>{item.permissionName}</td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.permissionName]?.view || false}
                                    onChange={() => handleCheckboxChange(item.permissionName, 'view')}
                                    disabled={item.permissionName == "Quản lí nhóm quyền" && idQuyen == 1 || item.permissionName === "Quản lí nhóm quyền" && idQuyen == 2 || item.permissionName === "Quản lí nhóm quyền" && idQuyen == 3}
                                />
                            </td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.permissionName]?.create || false}
                                    onChange={() => handleCheckboxChange(item.permissionName, 'create')}
                                    disabled={item.permissionName == "Quản lí nhóm quyền" && idQuyen == 1 || item.permissionName === "Quản lí nhóm quyền" && idQuyen == 2 || item.permissionName === "Quản lí nhóm quyền" && idQuyen == 3}
                                />
                            </td>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={permissions[item.permissionName]?.edit || false}
                                    onChange={() => handleCheckboxChange(item.permissionName, 'edit')}
                                    disabled={item.permissionName == "Quản lí nhóm quyền" && idQuyen == 1 || item.permissionName === "Quản lí nhóm quyền" && idQuyen == 2 || item.permissionName === "Quản lí nhóm quyền" && idQuyen == 3}
                                />
                            </td>
                            <td>
                                <div className="btn_row">
                                    <div onClick={() => selectAllRow(item.permissionName)}>
                                        <ChonTatCa />
                                    </div>
                                    <div onClick={() => deselectAllRow(item.permissionName)}>
                                        <HuyChonTatCa />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='row_last'>
                <div onClick={handleBack}> <GradientButtonBack /> </div>
                <div className="btn_row_last">
                    <div onClick={handleCancel}> <GradientButtonCancel /> </div>
                    <PermissionEditButton feature="Quản lí nhóm quyền">
                        <div onClick={handleUpdatePermissions}> <GradientButton /> </div> {/* Save Button */}
                    </PermissionEditButton>
                </div>
            </div>
        </div>
    );
};

export default QuyenEdit;