// src/components/common/ProfessionalProfile.jsx
import React from "react";
import { Form } from "react-bootstrap";

const ProfessionalProfile = ({ formData, handleChange, handleCheckboxChange }) => {
  return (
    <>
      <h5><strong>Professional Profile</strong></h5>
      <p className="text-muted">Complete your dental professional details</p>

      <Form.Group className="mb-3">
        <Form.Label>Full Name*</Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address*</Form.Label>
        <Form.Control
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile Number*</Form.Label>
        <Form.Control
          type="text"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Profession*</Form.Label>
        <Form.Select
          value={formData.profession}
          onChange={(e) => handleChange('profession', e.target.value)}
        >
          <option value="">Select Profession</option>
          <option value="Dentist">Dentist</option>
          <option value="Orthodontist">Orthodontist</option>
          <option value="Hygienist">Hygienist</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Years of Experience*</Form.Label>
        <Form.Select
          value={formData.year_of_experiance}
          onChange={(e) => handleChange('year_of_experiance', e.target.value)}
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1 Years">0-1 Years</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="5-10 Years">5-10 Years</option>
          <option value="10+ Years">10+ Years</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type of Experience*</Form.Label>
        <div>
          {['Private', 'Public', 'Both'].map((type) => (
            <Form.Check
              key={type}
              type="radio"
              label={type}
              name="type_of_experience"
              value={type}
              checked={formData.type_of_experience === type}
              onChange={(e) => handleChange("type_of_experience", e.target.value)}
              inline
            />
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label><strong>Qualification & Certifications</strong></Form.Label>
        <div className="row">
          {["Bachelor of Dental Science or similar", "Bachelor of Hygiene or similar", "Cert III in Dental Assisting", "Other", "Master of Clinical Dentistry or similar", "Bachelor of Dental therapy or similar", "Cert II in Dental Assisting"].map((item, index) => (
            <div className="col-md-6" key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.qualifications?.includes(item)}
                onChange={() => handleCheckboxChange("qualifications", item)}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label><strong>Software Experience</strong></Form.Label>
        <div className="row">
          {["Dental4Windows", "Oasis", "Other"].map((item, index) => (
            <div className="col-md-6" key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.software_experience?.includes(item)}
                onChange={() => handleCheckboxChange("software_experience", item)}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label><strong>Language</strong></Form.Label>
        <div className="row">
          {["English", "Hindi", "Other"].map((item, index) => (
            <div className="col-md-6" key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                value={item}
                checked={formData.language.includes(item)}
                onChange={() => handleCheckboxChange("language", item)}
              />
            </div>
          ))}
        </div>
      </Form.Group>
    </>
  );
};

export default ProfessionalProfile;
