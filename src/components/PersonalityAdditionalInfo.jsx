import React from 'react';
import { Form } from 'react-bootstrap';
import { BsCloudUpload } from 'react-icons/bs';
import '../styles/PersonalityAdditionalInfo.css'; // Create this CSS file

const PersonalityAdditionalInfo = ({ formData, handleChange, handleCheckboxChange }) => {
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange('document_base64', reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <h5><strong>Personality & Additional Information</strong></h5>

      <Form.Group className="mb-3">
        <Form.Label>Why do you love working in dentistry?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your answer here"
          value={formData.working_in_dentistry}
          onChange={(e) => handleChange('working_in_dentistry', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>What kind of work environment do you thrive in?</Form.Label>
        <div className="row">
          {[
            "Fast-Paced",
            "Collaborative",
            "Patient-Focused",
            "Technology-Driven",
            "Structured",
            "Flexible",
          ].map((item, index) => (
            <div className="col-md-6" key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.environment_thrive?.includes(item)}
                onChange={() => handleCheckboxChange("environment_thrive", item)}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      {/* Custom Resume Upload */}
      <Form.Group className="mb-3">
        <Form.Label>Resume</Form.Label>
        <div className="custom-upload-wrapper">
          <label htmlFor="resumeUpload" className="custom-upload-label">
            <BsCloudUpload size={24} />
            <span>Select Resume</span>
          </label>
          <input
            type="file"
            id="resumeUpload"
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            onChange={handleResumeUpload}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fun Fact About You!</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Tell us something interesting!"
          value={formData.fun_fact}
          onChange={(e) => handleChange('fun_fact', e.target.value)}
        />
      </Form.Group>
    </div>
  );
};

export default PersonalityAdditionalInfo;
