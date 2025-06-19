import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Spinner } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';
import Navbar from '../sections/common/Navbar';
import Footer from '../sections/common/Footer';
import { toast } from 'react-toastify';
import { SuccessToaster } from '../utils/Toaster';

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [mobileEditable, setMobileEditable] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    type_of_experiance: '',
    year_of_experiance: '',
    other_qualification: '',
    other_software: '',
    other_vaccination: '',
    hourly_rate: '',
    availability_time: '',
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
  });

  const token = localStorage.getItem("fillInToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          'https://fill-in.cyberxinfosolution.com/api/candidate/view-profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data?.data || {};
        setFormData((prev) => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          year_of_experiance: data.year_of_experiance || '',
          hourly_rate: data.hourly_rate || '',
          availability_time: data.availability_time || '',
          profession: data.profession || '',
          language: data.language || [1],
          software_experiance: data.software_experiance || [],
          qualification: data.qualification || [],
          vaccination: data.vaccination || [],
          // Add other fields if they exist in backend response
        }));
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
        'https://fill-in.cyberxinfosolution.com/api/candidate/update-profile',
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


  return (
    <>
      <Navbar />
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
              <Form.Control
                type="text"
                value={formData.year_of_experiance}
                onChange={(e) => handleChange('year_of_experiance', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hourly Rate</Form.Label>
              <Form.Control
                type="text"
                value={formData.hourly_rate}
                onChange={(e) => handleChange('hourly_rate', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Availability Time</Form.Label>
              <Form.Control
                type="text"
                value={formData.availability_time}
                onChange={(e) => handleChange('availability_time', e.target.value)}
              />
            </Form.Group>

            <Button onClick={updateProfile} variant="primary">
              Update Profile
            </Button>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default MyProfile;
