import React, { useState } from "react";
import { Card, Form, Button, Badge } from "react-bootstrap";

const JobDetails = () => {
  const [description, setDescription] = useState("We are looking for a Senior Dentist to join Our Team");
  const [tags, setTags] = useState(["Dentist", "Care", "Health"]);
  const [experience, setExperience] = useState("Senior Level 5 Years+");

  return (
    <Card className="p-4 m-4 shadow-sm border border-primary-subtle">
      <h6><strong>Job Details</strong></h6>

      <Form.Group className="mt-3">
        <Form.Label>Job Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-4">
        <Form.Label>Required Details</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Badge key={idx} pill bg="primary" className="px-3 py-2">{tag}</Badge>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mt-4">
        <Form.Label>Experience Level</Form.Label>
        <Form.Select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option value="">Select Experience Level</option>
          <option value="Entry Level">Entry Level</option>
          <option value="Mid Level">Mid Level</option>
          <option value="Senior Level 5 Years+">Senior Level 5 Years+</option>
        </Form.Select>
      </Form.Group>
    </Card>
  );
};

export default JobDetails;
