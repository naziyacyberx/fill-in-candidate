import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Spinner } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';
import Navbar from '../sections/common/Navbar';
import Footer from '../sections/common/Footer';
import { toast } from 'react-toastify';
import { SuccessToaster } from '../utils/Toaster';
import ProfessionalProfile from '../components/ProfessionalProfile';
import AvailabilityPreferences from '../components/AvailabilityPreferences';
import ComplianceVaccination from '../components/ComplianceVaccination';
import PersonalityAdditionalInfo from '../components/PersonalityAdditionalInfo';
import { baseUrl } from '../utils/BaseUrl';

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [mobileEditable, setMobileEditable] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    types_of_experiance: '',
    year_of_experiance: '',
    other_qualification: '',
    other_software: '',
    other_vaccination: '',
    short_notice: '',
    permanent_opportunities: '',
    childrens_check: '',
    valid_police_check: '',
    first_aid_certicate: '',
    working_in_dentistry: '',
    document_name: 'resume',
    environment_thrive: [],
    fun_fact: '',
    profession: '',
    software_experiance: [],
    qualification: [],
    vaccination: [],
    language: [1],
    profile: '', // For image base64
    qualifications:[],
    software_experience:[],

    availability_time: '',
    location: '',
    travel_radius:"",
    hourly_rate: '',
    flexible_pay:""
  });

  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${baseUrl}candidate/view-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data?.data || {};
        setFormData(response?.data?.data)
        // setFormData((prev) => ({
        //   ...prev,
        //   profile: data.profile || '',
        //   name: data.name || '',
        //   email: data.email || '',
        //   phone: data.phone || '',
        //   location: data.location || '',
        //   year_of_experiance: data.year_of_experiance || '',
        //   hourly_rate: data.hourly_rate || '',
        //   availability_time: data.availability_time || '',
        //   profession: data.profession || '',
        //   language: data.language || [1],
        //   software_experiance: data.software_experiance || [],
        //   qualification: data.qualification || [],
        //   vaccination: data.vaccination || [],
        //   // Add other fields if they exist in backend response
        // }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateProfile = async () => {
    if (!token) {
      return toast.error("Token not found");
    }

    try {
      await axios.post(
        `${baseUrl}candidate/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      SuccessToaster('Profile updated successfully');
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setFormData((prev) => ({
      ...prev,
      profile: reader.result, // Base64 string
    }));
  };
  reader.readAsDataURL(file);
};
const handleCheckboxChange = (field, value) => {
  setFormData((prev) => {
    const current = prev[field];
    const updated = current?.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    return { ...prev, [field]: updated };
  });
};




  return (
    <>
      {/* <Navbar /> */}
      <Container className="mt-4">
        <h5><strong>My Profile</strong></h5>

       <div className="text-center mb-4">
  <img
    src={formData.profile || "https://via.placeholder.com/120"}
    alt="Profile"
    className="rounded-circle mb-2"
    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
  />

  <Form.Group controlId="formFile" className="mt-2">
    <Form.Label className="btn btn-sm btn-secondary">Change Profile Picture</Form.Label>
    <Form.Control
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: 'none' }}
    />
  </Form.Group>
</div>

    {/* make seperate component */}
        {/* <Card className="p-4">
          <h5><strong>Professional Profile</strong></h5>
          <p className="text-muted">Complete your dental professional details</p>

          <Form>
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

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Mobile Number*</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                readOnly={!mobileEditable}
              />
              <FaPen
                className="position-absolute end-0 top-50 me-3 text-muted"
                style={{ cursor: 'pointer', transform: 'translateY(-50%)' }}
                onClick={() => setMobileEditable(true)}
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
    <Form.Check
      type="radio"
      label="Private"
      name="type_of_experience"
      value="Private"
      checked={formData.type_of_experience === "Private"}
      onChange={(e) => handleChange("type_of_experience", e.target.value)}
      inline
    />
    <Form.Check
      type="radio"
      label="Public"
      name="type_of_experience"
      value="Public"
      checked={formData.type_of_experience === "Public"}
      onChange={(e) => handleChange("type_of_experience", e.target.value)}
      inline
    />
    <Form.Check
      type="radio"
      label="Both"
      name="type_of_experience"
      value="Both"
      checked={formData.type_of_experience === "Both"}
      onChange={(e) => handleChange("type_of_experience", e.target.value)}
      inline
    />
  </div>
</Form.Group>


<Form.Group className="mb-3">
  <Form.Label><strong>Qualification & Certifications</strong></Form.Label>
  <div className="row">
    {[
      "Bachelor of Dental Science or similar",
      "Bachelor of Hygiene or similar",
      "Cert III in Dental Assisting",
      "Other",
      "Master of Clinical Dentistry or similar",
      "Bachelor of Dental therapy or similar",
      "Cert II in Dental Assisting",
    ].map((item, index) => (
      <div className="col-md-6" key={index}>
        <Form.Check
          type="checkbox"
          label={item}
          value={item}
          checked={formData.qualifications.includes(item)}
          onChange={(e) => handleCheckboxChange("qualifications", item)}
        />
      </div>
    ))}
  </div>
</Form.Group>


<Form.Group className="mb-3">
  <Form.Label><strong>Software Experience</strong></Form.Label>
  <div className="row">
    {[
      "Dental4Windows",
      "Oasis",
      "Other",
    ].map((item, index) => (
      <div className="col-md-6" key={index}>
        <Form.Check
          type="checkbox"
          label={item}
          value={item}
          checked={formData.software_experience.includes(item)}
          onChange={(e) => handleCheckboxChange("software_experience", item)}
        />
      </div>
    ))}
  </div>
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label><strong>Language</strong></Form.Label>
  <div className="row">
    {[
      "English",
      "Hindi",
      "Other",
    ].map((item, index) => (
      <div className="col-md-6" key={index}>
        <Form.Check
          type="checkbox"
          label={item}
          value={item}
          checked={formData.language.includes(item)}
          onChange={(e) => handleCheckboxChange("language", item)}
        />
      </div>
    ))}
  </div>
</Form.Group>

         
            <Button onClick={updateProfile} variant="primary">
              Update Profile
            </Button>
          </Form>
        </Card> */}

<Card className="p-4">
  <ProfessionalProfile
    formData={formData}
    handleChange={handleChange}
    handleCheckboxChange={handleCheckboxChange}
  />
<AvailabilityPreferences
  formData={formData}
  handleChange={handleChange}
/>
<ComplianceVaccination
  formData={formData}
  handleChange={handleChange}
  handleCheckboxChange={handleCheckboxChange}
/>
<PersonalityAdditionalInfo
  formData={formData}
  handleChange={handleChange}
  handleCheckboxChange={handleCheckboxChange}
/>

  <Button onClick={updateProfile} variant="primary">
    Update Profile
  </Button>
</Card>

      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default MyProfile;
