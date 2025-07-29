import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";

const Compensation = forwardRef(({ formData, setFormData }, ref) => {
  const [minSalary, setMinSalary] = useState(formData.salary_range_from || "");
  const [maxSalary, setMaxSalary] = useState(formData.salary_range_to || "");
  const [benefits, setBenefits] = useState(formData.benefits?.length ? formData.benefits : []);
  const [newBenefit, setNewBenefit] = useState("");
  const [validated, setValidated] = useState(false);

  // Sync with parent formData
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      salary_range_from: minSalary,
      salary_range_to: maxSalary,
      benefits: benefits,
    }));
  }, [minSalary, maxSalary, benefits]);

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index) => {
    const updated = [...benefits];
    updated.splice(index, 1);
    setBenefits(updated);
  };

  // ✅ Expose validation to parent
  useImperativeHandle(ref, () => ({
    validate: () => {
      setValidated(true);
      return minSalary && maxSalary && benefits.length > 0;
    },
  }));

  return (
    <Card className="p-4 m-4 shadow-sm border border-primary-subtle">
      <h6><strong>Compensation</strong></h6>

      {/* Salary Range */}
      <Form.Group className="mt-3">
        <Form.Label>Salary Range</Form.Label>
        <div className="d-flex gap-2">
          <InputGroup hasValidation>
            <InputGroup.Text><FaDollarSign /></InputGroup.Text>
            <Form.Control
              required
              type="number"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              placeholder="From"
              isInvalid={validated && !minSalary}
            />
            <Form.Control.Feedback type="invalid">Min salary required</Form.Control.Feedback>
          </InputGroup>

          <InputGroup hasValidation>
            <InputGroup.Text><FaDollarSign /></InputGroup.Text>
            <Form.Control
              required
              type="number"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              placeholder="To"
              isInvalid={validated && !maxSalary}
            />
            <Form.Control.Feedback type="invalid">Max salary required</Form.Control.Feedback>
          </InputGroup>
        </div>
      </Form.Group>

      {/* Benefits */}
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

        {validated && benefits.length === 0 && (
          <div className="text-danger mt-2">At least one benefit is required</div>
        )}

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
        </div>
      </Form.Group>
    </Card>
  );
});

export default Compensation;
