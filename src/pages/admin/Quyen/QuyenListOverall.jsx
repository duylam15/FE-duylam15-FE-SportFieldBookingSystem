import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuyenList from "./QuyenList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./quyen.css";
import { searchQuyen } from "../../../services/quyenService";
import IconLabelButtons from "../../../components/Admin/ColorButtons";

const QuyenListOverall = ({ size = 2 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [nhomQuyen, setNhomQuyen] = useState([]);
  const [sortField, setSortField] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // Fetch permissions based on current page and search term
  const fetchQuyen = async (searchName, page) => {
    try {

      const result = await searchQuyen(searchName, page - 1, size);
      if (result && result.data) {
        setNhomQuyen(result.data.data.content);
        setTotalPages(result.data.data.totalPages);
        
        // Check if currentPage exceeds total pages and adjust if necessary
        if (page > result.data.data.totalPages) {
          setCurrentPage(result.data.data.totalPages);
        }
      } else {
        setNhomQuyen([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Fetch data when currentPage changes or when searchName changes
  useEffect(() => {
    // When searchName changes, reset to page 1
    if (searchName !== "") {
      setCurrentPage(1); // Reset to page 1 when searchName changes
    }
  }, [searchName]); // Only listen to searchName changes

  useEffect(() => {
    fetchQuyen(searchName, currentPage); // Fetch with the current page
  }, [currentPage, searchName]); // Fetch data when currentPage or searchName changes

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleEdit = (idQuyen) => {
    navigate(`/admin/quyen/edit/${idQuyen}`);
  };

  const handleBlock = async (idQuyen) => {
    // Logic for blocking a permission
  };

  return (
    <>
      <h1>Danh sách nhóm quyền</h1>
      <Link to="add" className="non_decoration">
        <IconLabelButtons />
      </Link>
      <div className="separate_block"></div>
      <QuyenList
        nhomQuyen={nhomQuyen}
        searchName={searchName}
        setSearchName={setSearchName}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortField={sortField}
        onEdit={handleEdit}
        onBlock={handleBlock}
      />

      {/* Pagination Component */}
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={(event, value) => setCurrentPage(value)}
        />
      </Stack>
    </>
  );
};

export default QuyenListOverall;