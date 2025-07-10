import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const CreateJobBasicInfo = ({ formData, setFormData }) => {
  const [jobTitle, setJobTitle] = useState(formData.title || "");
  const [department, setDepartment] = useState(formData.department || "");
  const [location, setLocation] = useState(formData.address || "");
  const [employmentType, setEmploymentType] = useState(formData.employmentType || "");

  const employmentOptions = ["Full Time", "Part Time", "Contract", "Internship"];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: jobTitle,
      department: department,
      address: location,
      short_address: location?.split(",")[0] || "",
      employmentType: employmentType,
    }));
  }, [jobTitle, department, location, employmentType, setFormData]);

  const handleEmploymentClick = (type) => {
    setEmploymentType(type);
  };

  return (
    <Card className="m-4 p-4 shadow-sm border border-primary-subtle">
      <h6 className="mb-3"><strong>Basic Information</strong></h6>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Dentist Expert"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="Dentist">Dentist</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Hygienist">Hygienist</option>
            <option value="Oral Health Therapist">Oral Health Therapist</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. International williyam city 12"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Employment Type</Form.Label>
          <Row>
            {employmentOptions.map((type, idx) => (
              <Col xs={6} sm={6} md={3} key={idx} className="mb-2">
                <Button
                  variant={
                    employmentType === type
                      ? type === "Full Time"
                        ? "primary"
                        : type === "Part Time"
                        ? "info"
                        : "dark"
                      : "outline-secondary"
                  }
                  onClick={() => handleEmploymentClick(type)}
                  className="w-100"
                >
                  {type}
                </Button>
              </Col>
            ))}
          </Row>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default CreateJobBasicInfo;
