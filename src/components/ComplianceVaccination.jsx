// src/components/ComplianceVaccination.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const ComplianceVaccination = ({ formData, handleChange, handleCheckboxChange }) => {
  const vaccinations = [
    'Covid19',
    'Hapatitis B',
    'Influenza',
    'MMR (Measles, Mumps, Rubella)',
    'Pertussis (Whooping Cough)',
    'Vericella (Chickenpox)',
    'BCG (Tuberculosis)',
    'Other'
  ];

  return (
    <div className="mt-4">
      <h5><strong>Compliance & Vaccination Status</strong></h5>
      <p className="text-muted">(as per Australian health requirements)</p>

      <Form.Group className="mb-3">
        <Form.Label><strong>Select your Vaccination below</strong></Form.Label>
        <div className="row">
          {vaccinations.map((item, index) => (
            <div className="col-md-6" key={index}>
              <Form.Check
                type="checkbox"
                label={item}
                value={item}
                checked={formData?.vaccination?.includes(item)}
                onChange={() => handleCheckboxChange("vaccination", item)}
              />
            </div>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Do you have a current Working with Children's Check?</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="YES"
            name="childrens_check"
            value="YES"
            checked={formData.childrens_check === 'YES'}
            onChange={(e) => handleChange('childrens_check', e.target.value)}
            inline
          />
          <Form.Check
            type="radio"
            label="NO"
            name="childrens_check"
            value="NO"
            checked={formData.childrens_check === 'NO'}
            onChange={(e) => handleChange('childrens_check', e.target.value)}
            inline
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Do you have a valid Police Check?</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="YES"
            name="valid_police_check"
            value="YES"
            checked={formData.valid_police_check === 'YES'}
            onChange={(e) => handleChange('valid_police_check', e.target.value)}
            inline
          />
          <Form.Check
            type="radio"
            label="NO"
            name="valid_police_check"
            value="NO"
            checked={formData.valid_police_check === 'NO'}
            onChange={(e) => handleChange('valid_police_check', e.target.value)}
            inline
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Do you have a current first aid certificate?</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="YES"
            name="first_aid_certicate"
            value="YES"
            checked={formData.first_aid_certicate === 'YES'}
            onChange={(e) => handleChange('first_aid_certicate', e.target.value)}
            inline
          />
          <Form.Check
            type="radio"
            label="NO"
            name="first_aid_certicate"
            value="NO"
            checked={formData.first_aid_certicate === 'NO'}
            onChange={(e) => handleChange('first_aid_certicate', e.target.value)}
            inline
          />
        </div>
      </Form.Group>
    </div>
  );
};

export default ComplianceVaccination;
