import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";
import Pagination from "../../Pagination"; // Import pagination component
import { useParams } from "react-router-dom";

const FieldTimeRules = ({ fieldId }) => {
  const [fieldTimeRules, setFieldTimeRules] = useState([]);
  const [newTimeRule, setNewTimeRule] = useState({
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    daysOfWeek: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5); // Số lượng items mỗi trang

  useEffect(() => {
    if (fieldId) {
      fetchFieldTimeRules(fieldId, currentPage);
    } else {
      fetchFieldTimeRules(fieldIdParam, currentPage);
    }
  }, [fieldId, currentPage]);

  // Hàm lấy danh sách time rules cho trang hiện tại
  console.log(`field id: ` + fieldId);
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
      setTotalPages(response.totalPages);
      console.log(response.data);
    } catch (error) {
      toast.error("Error fetching time rules.");
      console.error(error);
    }
  };
  console.log(fieldTimeRules);
  // Thêm time rule mới
  const handleAddTimeRule = async () => {
    try {
      await crudService.create(`fieldTimeRules`, newTimeRule);
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
      toast.error("Error adding time rule.");
      console.error(error);
    }
  };

  // Xóa time rule
  const handleDeleteTimeRule = async (ruleId) => {
    try {
      await crudService.delete(`fieldTimeRules/${ruleId}`);
      toast.success("Time rule deleted successfully.");
      fetchFieldTimeRules(fieldId, currentPage);
    } catch (error) {
      toast.error("Error deleting time rule.");
      console.error(error);
    }
  };

  return (
    <div>
      <h5>Field Time Rules</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
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
          Add Time Rule
        </Button>
      </Form>
    </div>
  );
};

export default FieldTimeRules;
