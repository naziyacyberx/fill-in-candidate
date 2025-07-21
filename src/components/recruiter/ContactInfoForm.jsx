import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import {
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaEdit
} from 'react-icons/fa';

const ContactInfoForm = ({ profile, setProfile, dropdownData }) => {
  console.log("dropdownData", dropdownData);
  
    const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="container py-4" >
      <h5><strong>Contact Information</strong></h5>
      <Form>

        {/* Contact Name */}
        <Form.Group className="mb-3">
          <Form.Label>Contact Name<span className="text-danger">*</span></Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <FaUser />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name='name'
              value={profile?.name || ''}
              onChange={handleChange}
              placeholder="Enter Practice Name"
              className="bg-light border-0"
            />
          </InputGroup>
        </Form.Group>

        {/* Position */}
        <Form.Group className="mb-3">
          <Form.Label>Position<span className="text-danger">*</span></Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <FaBriefcase />
            </InputGroup.Text>
         <Form.Select
  className="bg-light border-0"
  name="practice_role"
  value={profile?.practice_role || ''}
  onChange={(e) =>
    setProfile((prev) => ({
      ...prev,
      practice_role: e.target.value, // ✅ store the value, not the label
    }))
  }
>
  <option value="">Select your position</option>
  {dropdownData?.profession?.map((position, i) => (
    <option key={i} value={position.value}>
      {position.key}
    </option>
  ))}
</Form.Select>

          </InputGroup>
        </Form.Group>

        {/* Email Address */}
        <Form.Group className="mb-3">
          <Form.Label>Email Address<span className="text-danger">*</span></Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <FaEnvelope />
            </InputGroup.Text>
            <Form.Control
              type="email"
              defaultValue={profile?.email || ''}
              placeholder="Enter your email address"
              className="bg-light border-0"
              readOnly
            />
            <InputGroup.Text className="bg-light">
              <FaEdit />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* Phone Number */}
        <Form.Group className="mb-3">
          <Form.Label>Phone No<span className="text-danger">*</span></Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <FaPhone />
            </InputGroup.Text>
            <Form.Control
              type="tel"
              defaultValue={profile?.phone || ''}
              placeholder="Enter your number"
              className="bg-light border-0"
              readOnly
            />
            <InputGroup.Text className="bg-light">
              <FaEdit />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* Website URL */}
        <Form.Group className="mb-3">
          <Form.Label>Website URL<span className="text-danger">*</span></Form.Label>
          <InputGroup>
            <InputGroup.Text className="bg-light">
              <FaGlobe />
            </InputGroup.Text>
            <Form.Control
              type="url"
              name='web_link'
              defaultValue={profile?.web_link || ''}
              onChange={handleChange}
              placeholder="Enter website url"
              className="bg-light border-0"
            />
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ContactInfoForm;
