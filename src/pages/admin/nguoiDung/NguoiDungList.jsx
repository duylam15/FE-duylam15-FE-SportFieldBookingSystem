import React, { useState } from "react";
import EditBtn from "../../../components/Admin/ColorButtons/EditBtn";
import DeleteBtn from "../../../components/Admin/ColorButtons/deleteBtn";
import './nguoiDungList.scss'
const NguoiDungList = ({
    nguoiDung,
    loading,
    onEdit,
}) => {

    if (loading) return <p>Loading...</p>;

    return (
        <div className="nguoiDungTable">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Mã</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Quyền</th>
                        <th>Trạng thái</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {nguoiDung && nguoiDung == "" ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Không tìm thấy kết quả tìm kiếm!
                            </td>
                        </tr>
                    ) : (
                        nguoiDung &&
                        nguoiDung.map((v) => (
                            <tr key={v.userId}>
                                <td>{v.userId}</td>
                                <td>{v.userCode}</td>
                                <td>{v.email}</td>
                                <td>{v.phone}</td>
                                <td>{v.role.tenQuyen}</td>
                                <td>{v.status}</td>
                                <td>
                                   <div className="row_btn">
                                    <div className="btn_block" onClick={() => onEdit(v.userId)}><EditBtn></EditBtn></div>
                                    <div className="btn_block"><DeleteBtn></DeleteBtn></div>
                                   </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default NguoiDungList;
