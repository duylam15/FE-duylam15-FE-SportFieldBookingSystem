import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";
import Pagination from "../../Pagination"; // Import pagination component
import { useParams } from "react-router-dom";
import { Input } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./timeSlot.scss";
const FieldTimeSlots = () => {
  // first data
  const { fieldId } = useParams();
  const [timeSlots, setTimeSlots] = useState([]);
  //search data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(5); // Số lượng items mỗi trang
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState();

  //navigate
  const navigate = useNavigate();

  //sorting data
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    if (fieldId) {
      fetchTimeSlots(fieldId, currentPage);
    }
  }, [fieldId, currentPage]);

  //   useEffect(() => {
  //     fetchTimeSlots(startDate, endDate, status); // Fetch with the current page
  //   }, [currentPage, endDate, status]);

  const fetchTimeSlots = async (fieldId, page) => {
    try {
      const response = await crudService.read(
        "timeSlot/search",
        null, // No URL params to append
        {
          params: {
            fieldId: fieldId,
            startDate: startDate,
            endDate: endDate,
            status: status,
            page: page,
            size: itemsPerPage,
            sort: `${sortConfig.key},${sortConfig.direction}`,
          },
        }
      );
      setTimeSlots(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Error fetching time slots.");
      console.error(error);
    }
  };

  // Xóa time rule
  const handleDeleteTimeSlot = async (id) => {
    try {
      await crudService.delete(`timeSlot/${id}`);
      toast.success("Time slot deleted successfully.");
      fetchTimeSlots(fieldId, currentPage);
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedTimeSlots = [...timeSlots].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTimeSlots(sortedTimeSlots);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " 🔼" : " 🔽";
    }
    return " ↕";
  };

  const handleBackClick = (fieldId) => {
    navigate(`/fields/fieldTimeRule/${fieldId}`);
  };
  console.log(timeSlots);
  return (
    <div>
      <Button className="mt-2" onClick={() => handleBackClick(fieldId)}>
        Back
      </Button>
      {/* <div className="mt-2 timkiem">
        <div className="block_input">
          <label htmlFor="inputStartDate">Ngày bắt đầu</label>
          <Input
            type="Date"
            placeholder="Nhập tên sân"
            prefix={<FileSearchOutlined />}
            id="inputTenSan"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
      </div> */}
      <h5 className="mt-4">Time Slot List</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            {[
              { label: "Ngày", key: "date", className: "date-column" },
              { label: "Thời gian bắt đầu", key: "startTime" },
              { label: "Thời gian kết thúc", key: "endTime" },
              { label: "Trạng thái", key: "status" },
            ].map(({ label, key }) => (
              <th key={key} onClick={() => handleSort(key)}>
                {label} {getSortIcon(key)}
              </th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots?.map((timeSlot) => (
            <tr key={timeSlot.id}>
              <td>{timeSlot.date}</td>
              <td>{timeSlot.startTime}</td>
              <td>{timeSlot.endTime}</td>
              <td>{timeSlot.status}</td>
              <td>
                <Button
                  variant="danger"
                  disabled={timeSlot.status !== "AVAILABLE"}
                  onClick={() => handleDeleteTimeSlot(timeSlot.timeslotId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default FieldTimeSlots;
