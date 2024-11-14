import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchNguoiDung } from '../../../services/nguoiDungService';
import NguoiDungList from './NguoiDungList';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import './nguoiDungListOverral.scss'
import IconLabelButtons from '../../../components/Admin/ColorButtons';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import { getAllQuyen } from '../../../services/quyenService';

const { Option } = Select;

const NguoiDungListOverral = ({ size = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [searchUserName, setSearchUserName] = useState("");
    const [searchEmail, setSearchEmail] = useState("")
    const [searchQuyenName, setSearchQuyenName] = useState("")
    const [nguoiDung, setNguoiDung] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0); // State for total pages
    const navigate = useNavigate();
    const [quyen, setQuyen] = useState([]); // Changed to array for storing permissions list

    const fetchNguoiDung = async (page, size, username, email, roleName) => {
        try {
            setLoading(true);
            const result = await searchNguoiDung(page - 1, size, username, email, roleName);
            if (result && result.data.data) {
                setNguoiDung(result.data.data.content);
                setTotalPages(result.data.data.totalPages);
            } else {
                setNguoiDung([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching nguoi dung:", error);
        } finally {
            setLoading(false);
        }
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
        setCurrentPage(1); // Reset to page 1 when search filters change
        fetchNguoiDung(1, size, searchUserName, searchEmail, searchQuyenName);
    }, [searchUserName, searchEmail, searchQuyenName]);

    useEffect(() => {
        fetchNguoiDung(currentPage, size, searchUserName, searchEmail, searchQuyenName);
    }, [currentPage]);

    const handleEdit = (idNguoiDung) => {
        navigate(`/admin/nguoidung/edit/${idNguoiDung}`);
    };

    return (
        <div className='nguoiDungListOverral'>
            <h1 className='title'>Danh sách người dùng</h1>
            <Link to="add" className='nutThem'>
                <IconLabelButtons />
            </Link>

            <div className='timkiem'>
                <div className='block_input'>
                    <label htmlFor="inputTen">User name</label>
                    <Input
                        placeholder="Nhập user name người dùng"
                        prefix={<UserOutlined />}
                        id='inputTen'
                        value={searchUserName}
                        onChange={(e) => setSearchUserName(e.target.value)}
                    />
                </div>
                <div className='block_input'>
                    <label htmlFor="inputEmail">Email</label>
                    <Input
                        placeholder="Nhập email người dùng"
                        prefix={<MailOutlined />}
                        id='inputEmail'
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                </div>
                <div className='block_input'>
                    <label>Quyền</label>
                    <div>
                    <Select
                        style={{ width: 200 }}
                        onChange={(value) => setSearchQuyenName(value)}
                        value={searchQuyenName}
                    >
                        <Option value="">Chọn quyền</Option>
                        {quyen.map((e) => (
                            <Option key={e.tenQuyen} value={e.tenQuyen}>
                                {e.tenQuyen}
                            </Option>
                        ))}
                    </Select>
                    </div>
                </div>
            </div>

            <NguoiDungList
                nguoiDung={nguoiDung}
                loading={loading}
                onEdit={handleEdit}
            />

            <div className="center">
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event, value) => setCurrentPage(value)}
                    />
                </Stack>
            </div>
        </div>
    );
};

export default NguoiDungListOverral;