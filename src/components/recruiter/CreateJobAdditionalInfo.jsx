import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { FaCalendarAlt, FaFileAlt } from "react-icons/fa";

const AdditionalInfo = ({ formData, setFormData }) => {
  const [deadline, setDeadline] = useState(formData?.expire_date || "");
  const [requiredDocs, setRequiredDocs] = useState(formData?.requiredDocuments || {
    resume: false,
    portfolio: false,
    coverLetter: false,
    references: false,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      expire_date: deadline,
      requiredDocuments: requiredDocs,
    }));
  }, [deadline, requiredDocs, setFormData]);

  const toggleDocument = (key) => {
    setRequiredDocs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-4 m-4">
      <h6><strong>Additional Information</strong></h6>

      {/* Application Deadline */}
      <Form.Group className="mt-3">
        <Form.Label>Application Deadline</Form.Label>
        <div className="d-flex align-items-center gap-2">
          <FaCalendarAlt className="text-danger" />
          <Form.Control
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>
      </Form.Group>

      {/* Required Documents */}
      <Form.Group className="mt-4">
        <Form.Label>Required Documents</Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {[
            { key: "resume", label: "Resume/CV" },
            { key: "portfolio", label: "Portfolio" },
            { key: "coverLetter", label: "Cover Letter" },
            { key: "references", label: "References" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="d-flex align-items-center border rounded px-3 py-2"
              style={{ minWidth: "150px", justifyContent: "space-between" }}
            >
              <span><FaFileAlt className="me-2 text-primary" />{label}</span>
              <Form.Check
                type="checkbox"
                checked={requiredDocs[key]}
                onChange={() => toggleDocument(key)}
              />
            </div>
          ))}
        </div>
      </Form.Group>
    </div>
  );
};

export default AdditionalInfo;
