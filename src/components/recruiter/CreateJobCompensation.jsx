import React, { useState } from "react";
import { Card, Form, InputGroup, Button, Badge } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";

const Compensation = () => {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [benefits, setBenefits] = useState([
    "Health Insurance",
    "257(k) Plan",
    "Paid Time Off",
    "Health Insurance",
  ]);
  const [newBenefit, setNewBenefit] = useState("");

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit)) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index) => {
    const updated = [...benefits];
    updated.splice(index, 1);
    setBenefits(updated);
  };

  return (
    <Card className="p-4 m-4 shadow-sm border border-primary-subtle">
      <h6><strong>Compensation</strong></h6>

      <Form.Group className="mt-3">
        <Form.Label>Salary Range</Form.Label>
        <div className="d-flex gap-2">
          <InputGroup>
            <InputGroup.Text><FaDollarSign /></InputGroup.Text>
            <Form.Control
              type="number"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              placeholder="Min"
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text><FaDollarSign /></InputGroup.Text>
            <Form.Control
              type="number"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              placeholder="Max"
            />
          </InputGroup>
        </div>
      </Form.Group>

      <Form.Group className="mt-4">
        <Form.Label>Benefits</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Add Benefits"
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
          />
          <Button onClick={addBenefit}>Add</Button>
        </div>

        <div className="mt-3">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center bg-light px-3 py-1 mb-2 rounded"
            >
              <span>• {item}</span>
              <span role="button" className="text-danger" onClick={() => removeBenefit(index)}>×</span>
            </div>
          ))}
          <div className="text-primary small mt-1" role="button">View All →</div>
        </div>
      </Form.Group>
    </Card>
  );
};

export default Compensation;
