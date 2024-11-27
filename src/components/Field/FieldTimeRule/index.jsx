import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";
import Pagination from "../../Pagination"; // Import pagination component
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FieldTimeRules = () => {
  const { fieldId } = useParams();
  const [fieldTimeRules, setFieldTimeRules] = useState([]);
  const [newTimeRule, setNewTimeRule] = useState({
    fieldId: fieldId,
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    daysOfWeek: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5); // Số lượng items mỗi trang
  console.log(newTimeRule);
  //navigate
  const navigate = useNavigate();
  useEffect(() => {
    if (fieldId) {
      fetchFieldTimeRules(fieldId, currentPage);
    }
  }, [fieldId, currentPage]);

  const fetchFieldTimeRules = async (fieldId, page) => {
    try {
      const response = await crudService.read(
        "fieldTimeRules/getByFieldId",
        null, // No URL params to append
        {
          params: {
            fieldId: fieldId,
            page: page,
            pageSize: itemsPerPage,
          },
        }
      );
      setFieldTimeRules(response.content);
      console.log(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Error fetching time rules.");
      console.error(error);
    }
  };
  const formatDaysOfWeek = (daysArray) => {
    if (!Array.isArray(daysArray)) return "";
    return daysArray.join(",") + ",";
  };
  // Thêm time rule mới
  const handleAddTimeRule = async () => {
    if (validateTimeRule()) {
      try {
        const formatedDay = formatDaysOfWeek(newTimeRule.daysOfWeek);
        newTimeRule.daysOfWeek = formatedDay;
        console.log(newTimeRule);
        const response = await crudService.create(
          `fieldTimeRules`,
          newTimeRule
        );
        toast.success("Time rule added successfully.");
        setNewTimeRule({
          fieldId: fieldId,
          startTime: "",
          endTime: "",
          startDate: "",
          endDate: "",
          daysOfWeek: [],
        });
        fetchFieldTimeRules(fieldId, currentPage);
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(`Error: ${error.response.data}`);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    }
  };

  // Xóa time rule
  const handleDeleteTimeRule = async (id) => {
    console.log("Deleting time rule with ID:", id); // Debugging log
    try {
      await crudService.delete(`fieldTimeRules/${id}`);
      toast.success("Time rule deleted successfully.");
      fetchFieldTimeRules(fieldId, currentPage);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const validateTimeRule = () => {
    const { startTime, endTime, startDate, endDate, daysOfWeek } = newTimeRule;

    if (!startTime || !endTime) {
      toast.error("Bạn phải nhập thời gian bắt đầu và kết thúc");
      return false;
    }

    if (startTime >= endTime) {
      toast.error("Thời gian kết thúc không được thấp hơn thời gian bắt đầu");
      return false;
    }

    if (!startDate || !endDate) {
      toast.error("Bạn phải nhập ngày bắt đầu và kết thúc");
      return false;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Thời gian kết thúc không được thấp hơn thời gian bắt đầu");
      return false;
    }

    if (daysOfWeek.length === 0) {
      toast.error("Xin hãy chọn ít nhất một ngày trong tuần");
      return false;
    }

    return true;
  };

  const handleClickTimeSlot = (fieldId) => {
    navigate(`/admin/san/timeSlots/${fieldId}`);
  };

  return (
    <div>
      <h5>Field Time Rules</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days of Week</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fieldTimeRules?.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.id}</td>
              <td>{rule.startTime}</td>
              <td>{rule.endTime}</td>
              <td>{rule.startDate}</td>
              <td>{rule.endDate}</td>
              <td>{rule.daysOfWeek}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteTimeRule(rule.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handleClickTimeSlot(fieldId)}>
        Danh sánh time slot
      </Button>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <h6>Add New Time Rule</h6>
      <Form>
        <Form.Group>
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            value={newTimeRule.startTime}
            onChange={(e) =>
              setNewTimeRule({ ...newTimeRule, startTime: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            value={newTimeRule.endTime}
            onChange={(e) =>
              setNewTimeRule({ ...newTimeRule, endTime: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={newTimeRule.startDate}
            onChange={(e) =>
              setNewTimeRule({ ...newTimeRule, startDate: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={newTimeRule.endDate}
            onChange={(e) =>
              setNewTimeRule({ ...newTimeRule, endDate: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Days of Week</Form.Label>
          <div>
            {[
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ].map((day) => (
              <Form.Check
                inline
                key={day}
                type="checkbox"
                label={day}
                value={day}
                checked={newTimeRule.daysOfWeek.includes(day)}
                onChange={(e) => {
                  const updatedDays = e.target.checked
                    ? [...newTimeRule.daysOfWeek, day]
                    : newTimeRule.daysOfWeek.filter((d) => d !== day);

                  setNewTimeRule({ ...newTimeRule, daysOfWeek: updatedDays });
                }}
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" onClick={handleAddTimeRule}>
          Thêm
        </Button>
      </Form>
    </div>
  );
};

export default FieldTimeRules;
