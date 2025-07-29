import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaUsers,
  FaUpload,
} from 'react-icons/fa';

const PracticeInfoForm = ({ profile, setProfile }) => {
  const profileImageRef = useRef(null);
  const logoFileRef = useRef(null);

  const handleProfileImageSelect = () => {
    profileImageRef.current?.click();
  };

  const handleLogoFileSelect = () => {
    logoFileRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfile((prev) => ({
        ...prev,
        profile: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfile((prev) => ({
        ...prev,
        document: base64String,
        document_name: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container py-4">
      {/* Profile Image */}
      <div className="d-flex flex-column align-items-center mb-4 position-relative">
        <img
          src={profile?.profile || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="rounded-circle"
          width={100}
          height={100}
        />
        <span
          onClick={handleProfileImageSelect}
          className="position-absolute bg-primary p-1 rounded-circle"
          style={{ bottom: 0, right: '40%', cursor: 'pointer' }}
        >
          <FaEdit color="white" size={14} />
        </span>
        <input
          type="file"
          accept="image/*"
          ref={profileImageRef}
          className="d-none"
          onChange={handleImageUpload}
        />
      </div>

      <h5><strong>Practice Information</strong></h5>
      <p>Complete your practice details</p>

      {/* Practice Name */}
 

      <Form.Group className="mb-3">
        <Form.Label>
          Practice Name<span className="text-danger">*</span>
        </Form.Label>
        <div className="input-group bg-light">
          <span className="input-group-text bg-light border-0">
            <FaBuilding />
          </span>
          <Form.Control
            type="text"
            value={profile?.practice_name || ''}
            name="practice_name"
            onChange={handleChange}
            placeholder="Enter practice name"
            className="bg-light border-0"
          />
        </div>
      </Form.Group>

      {/* Established Year */}
      <Form.Group className="mb-3">
        <Form.Label>Established Year<span className="text-danger">*</span></Form.Label>
        <div className="input-group bg-light">
          <span className="input-group-text bg-light border-0">
            <FaCalendarAlt />
          </span>
          <Form.Select
            name="established_year"
            value={profile?.established_year || ''}
            onChange={handleChange}
            className="bg-light border-0"
          >
            <option value="">Select Year</option>
            {[...Array(50)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </Form.Select>
        </div>
      </Form.Group>

      {/* Location & Zip Code */}
      <Form.Group className="mb-3">
        <Form.Label>Location<span className="text-danger">*</span></Form.Label>
        <div className="input-group bg-light mb-2">
          <span className="input-group-text bg-light border-0">
            <FaMapMarkerAlt />
          </span>
          <Form.Control
            type="text"
            name="address"
            value={profile?.address || ''}
            onChange={handleChange}
            placeholder="Search Location"
            className="bg-light border-0"
          />
        </div>
        <Form.Control
          type="text"
          name="postcode"
          value={profile?.postcode || ''}
          onChange={handleChange}
          placeholder="Enter Zip Code"
          className="bg-light border-0"
        />
      </Form.Group>

      {/* Team Size */}
      <Form.Group className="mb-3">
        <Form.Label>Practice Size</Form.Label>
        <div className="input-group bg-light">
          <span className="input-group-text bg-light border-0">
            <FaUsers />
          </span>
          <Form.Select
            name="practice_size"
            value={profile?.practice_size || ''}
            onChange={handleChange}
            className="bg-light border-0"
          >
            <option value="">Select your team size</option>
            <option value="Solo Practice">Solo Practice</option>
            <option value="Small Team (2-5)">Small Team (2-5)</option>
            <option value="Medium Team (6-10)">Medium Team (6-10)</option>
            <option value="Large Team (10+)">Large Team (10+)</option>
          </Form.Select>
        </div>
      </Form.Group>

     {/* Practice Logo */}
      <Form.Group className="mb-3">
        <Form.Label>Your Practice Logo</Form.Label>
        <div
          className="border p-4 text-center bg-light rounded"
          onClick={handleLogoFileSelect}
          style={{ cursor: 'pointer' }}
        >
          <FaUpload className="mb-2" />
          <p className="mb-0">Select File</p>
          <input
            name="document"
            type="file"
            accept="image/*"
            ref={logoFileRef}
            className="d-none"
            onChange={handleLogoUpload}
          />
          {profile?.document_name && (
            <strong className="text-muted d-block mt-2">{profile.document_name}</strong>
          )}
        </div>
      </Form.Group>

      {/* About Clinic */}
      <Form.Group className="mb-3">
        <Form.Label>Tell Us About Your Clinic</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          className="bg-light border-0"
          placeholder="Write something here"
          value={profile?.description || ''}
          onChange={handleChange}
        />
      </Form.Group>
      
    </div>
  );
};

export default PracticeInfoForm;
