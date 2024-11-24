import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";

const FieldTimeRules = ({ fieldId }) => {
  const [fieldTimeRules, setFieldTimeRules] = useState([]);
  const [newTimeRule, setNewTimeRule] = useState({
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    daysOfWeek: "",
  });

  useEffect(() => {
    if (fieldId) {
      fetchFieldTimeRules(fieldId);
    }
  }, [fieldId]);

  const fetchFieldTimeRules = async (fieldId) => {
    try {
      const response = await crudService.read(`fields/${fieldId}/timeRules`);
      setFieldTimeRules(response);
    } catch (error) {
      toast.error("Error fetching time rules.");
      console.error(error);
    }
  };

  const handleAddTimeRule = async () => {
    try {
      await crudService.create(`fields/${fieldId}/timeRules`, newTimeRule);
      toast.success("Time rule added successfully.");
      setNewTimeRule({
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        daysOfWeek: "",
      });
      fetchFieldTimeRules(fieldId);
    } catch (error) {
      toast.error("Error adding time rule.");
      console.error(error);
    }
  };

  const handleDeleteTimeRule = async (ruleId) => {
    try {
      await crudService.delete(`fields/${fieldId}/timeRules/${ruleId}`);
      toast.success("Time rule deleted successfully.");
      fetchFieldTimeRules(fieldId);
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
          {fieldTimeRules.map((rule) => (
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
          <Form.Control
            type="text"
            placeholder="e.g., MONDAY,WEDNESDAY,FRIDAY"
            value={newTimeRule.daysOfWeek}
            onChange={(e) =>
              setNewTimeRule({ ...newTimeRule, daysOfWeek: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddTimeRule}>
          Add Time Rule
        </Button>
      </Form>
    </div>
  );
};

export default FieldTimeRules;
