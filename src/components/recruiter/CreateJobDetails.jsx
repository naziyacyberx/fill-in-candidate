import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Card, Form, Button, Badge } from "react-bootstrap";

const JobDetails = forwardRef(({ formData, setFormData }, ref) => {
  const [description, setDescription] = useState(formData.description || "");
  const [tags, setTags] = useState(formData.tags?.length ? formData.tags : ["Dentist", "Care", "Health"]);
  const [experience, setExperience] = useState(formData.experience || "");
  const [validated, setValidated] = useState(false);

  // Sync with parent formData
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      job_description:description,
      tags,
      experiance_level:experience,
    }));
  }, [description, tags, experience]);

  // Expose validation to parent
  useImperativeHandle(ref, () => ({
    validate: () => {
      setValidated(true);
      return description.trim() !== "" && experience !== "" && tags.length > 0;
    },
  }));
const experienceYearsSingle = [
  '0-1 Years',
  '1-3 Years',
  '3-5 Years',
  '5-10 Years',
  '10+ Years',
];
  return (
    <Card className="p-4 m-4 shadow-sm border border-primary-subtle">
      <h6><strong>Job Details</strong></h6>

      {/* Job Description */}
      <Form.Group className="mt-3">
        <Form.Label>Job Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isInvalid={validated && description.trim() === ""}
        />
        <Form.Control.Feedback type="invalid">Job description is required.</Form.Control.Feedback>
      </Form.Group>

      {/* Required Tags */}
      {/* <Form.Group className="mt-4">
        <Form.Label>Required Details</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Badge key={idx} pill bg="primary" className="px-3 py-2">{tag}</Badge>
          ))}
        </div>
        {validated && tags.length === 0 && (
          <div className="text-danger mt-2">At least one tag is required.</div>
        )}
      </Form.Group> */}

      {/* Experience Level */}
      <Form.Group className="mt-4">
        <Form.Label>Experience Level</Form.Label>
        <Form.Select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          isInvalid={validated && experience === ""}
        >
          <option value="">Select Experience Level</option>
          {
            experienceYearsSingle.map((item,i)=>(
              <>
          <option value={item}>{item}</option>
              </>
            ))
          }
   
        </Form.Select>
        <Form.Control.Feedback type="invalid">Experience level is required.</Form.Control.Feedback>
      </Form.Group>
    </Card>
  );
});

export default JobDetails;
