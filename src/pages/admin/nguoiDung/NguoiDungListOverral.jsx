import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchNguoiDung } from '../../../services/nguoiDungService';
import NguoiDungList from './NguoiDungList';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import './nguoiDungListOverral.scss'
import IconLabelButtons from '../../../components/Admin/ColorButtons';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Select } from 'antd';

const NguoiDungListOverral = ({ size = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [searchUserName, setSearchUserName] = useState("");
    const [searchPhone, setSearchPhone] = useState("")
    const [searchQuyenName, setSearchQuyenName] = useState("")
    const [nguoiDung, setNguoiDung] = useState([]);
    const [loading, setLoading] = useState("");
    const [totalPages, setTotalPages] = useState(0); // State for total pages
    const navigate = useNavigate();

    const fetchNguoiDung = async (page, size, searchUserName, searchPhone, searchQuyenName) => {
        try {

            const result = await searchNguoiDung(page - 1, size, searchUserName, searchPhone, searchQuyenName)
            if (result && result.data.data) {
                setNguoiDung(result.data.data.content);
                setTotalPages(result.data.data.totalPages); // Update total pages based on API response
            } else {
                setNguoiDung([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching nguoi dung:", error);
        }
    };

    // Fetch data when currentPage changes or when searchName changes
    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 when searchName or selectedDates change
        fetchNguoiDung(1, size, searchUserName, searchPhone, searchQuyenName);
    }, [searchUserName, searchPhone, searchQuyenName]);

    useEffect(() => {
        fetchNguoiDung(currentPage, size, searchUserName, searchPhone, searchQuyenName);
    }, [currentPage]);

    console.log("Nguoi dung ~ ", nguoiDung)

    const handleEdit = (idNguoiDung) => {
        navigate(`/admin/nguoidung/edit/${idNguoiDung}`); // Điều hướng đến trang sửa
    };
    return (
        <div className='nguoiDungListOverral'>
            <h1 className='title'>Danh sách người dùng</h1>
            <Link to="add" className='nutThem'>
                <IconLabelButtons></IconLabelButtons>
            </Link>

            <div className='timkiem'>
                <div className='block_input'>
                    <label htmlFor="inputMa">Mã</label>
                    <Input placeholder="Nhập mã người dùng" prefix={<UserOutlined />} id='inputMa' />
                </div>
                <div className='block_input'>
                    <label htmlFor="inputTen">User name</label>
                    <Input placeholder="Nhập user name người dùng" prefix={<UserOutlined />} id='inputTen' />
                </div >
                <div className='block_input'>
                    <label>Quyền</label>
                    <div>
                    <Select
                        style={{ width: 200 }}
                    >
                        <Option value="ACTIVE">Hoạt động</Option>
                        <Option value="IN_ACTIVE">Không hoạt động</Option>
                    </Select>
                    </div>
                </div>

            </div>
            
            <NguoiDungList
                nguoiDung={nguoiDung}
                loading={loading}
                onEdit={handleEdit}
            ></NguoiDungList>

            <div className="center">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages} // Total number of pages
                        page={currentPage} // Current page
                        variant="outlined"
                        shape="rounded"
                        onChange={(event, value) => setCurrentPage(value)} // Update current page
                    />
                </Stack>
            </div>
        </div>
    );
};

export default NguoiDungListOverral;