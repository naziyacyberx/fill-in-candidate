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
    flexible_pay:"",
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
    const current = Array.isArray(prev[field]) ? prev[field] : [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    return {
      ...prev,
      [field]: updated,                         
    };
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
