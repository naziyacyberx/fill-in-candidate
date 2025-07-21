import React, { useEffect, useState } from 'react';
import PracticeInfoForm from '../../components/recruiter/PracticeInfoForm';
import ContactInfoForm from '../../components/recruiter/ContactInfoForm';
import StaffingRequirementsForm from '../../components/recruiter/StaffingRequirementsForm';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { baseUrl } from '../../utils/BaseUrl';
import { convertFileUrlToBase64,  fileToBase64 } from '../../utils/function';

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [dropdownData, setDropdownData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('recruiterToken');

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}recruiter/view-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        setProfileData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch recruiter profile:', err);
      } finally {
        setLoading(false);
      }
    };
    const fetchDropdown = async () => {
      try {
        const res = await axios.post(
          `${baseUrl}recruiter/get-dropdown-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        setDropdownData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch Dropdown Data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchDropdown()
  }, []);

const handleProfileUpdate = async () => {
  console.log("profileData", profileData);

  try {
    const token = localStorage.getItem('recruiterToken');

    let base64Document = '';
    let base64Profile = '';

 

        if (!profileData?.document?.startsWith('data:')) {
          base64Document = null
        } else { 
          // Already base64
          base64Document = profileData?.document;
        }
        if (!profileData?.profile?.startsWith('data:')) {
          base64Profile = null
        } else { 
          // Already base64
          base64Profile = profileData?.profile;
        }

    const response = await axios.post(
      `${baseUrl}recruiter/update-profile`,
      {
        email: profileData.email,
        name: profileData.name,
        practice_name: profileData.practice_name, 
        established_year: profileData.established_year,
        practice_size: profileData.practice_size,
        location: profileData.address,
        document: base64Document,
        document_name: profileData.document_name,
        profile: base64Profile,
        web_link:profileData.web_link,
        primarly_looking: profileData.primarly_looking,
        working_hours: profileData.working_hours || [],
        other_dentistry: profileData.other_dentistry || '',
        other_practice_role: profileData.other_practice_role || '',
        other_use_software: profileData.other_software || '',
        postcode: profileData.postcode,
        dentistry: profileData.dentistry || [],    
        looking: profileData.looking || [],
        practice_role: Number(profileData.practice_role),
        use_software: profileData.use_software || [],
        practice_phone: profileData.phone,
        description: profileData.description || '',   
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    alert('Profile updated successfully!');
  } catch (err) {
    console.error('Profile update failed:', err);
    alert('Failed to update profile.');
  }
};


  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading Profile...</p>
      </div>   
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: '900px' }}>
      <PracticeInfoForm profile={profileData} setProfile={setProfileData} />
      <ContactInfoForm profile={profileData} setProfile={setProfileData} dropdownData={dropdownData} />
      <StaffingRequirementsForm profile={profileData} setProfile={setProfileData}  dropdownData={dropdownData} />

      <div className="d-flex justify-content-start mt-4">
        <GradientButton label="Update Profile" onClick={handleProfileUpdate} />
      </div>
    </div>
  );
};

export default MyProfile;

const GradientButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(to right, #0d6efd, #53e3f1)',
        border: 'none',
        color: 'white',
        padding: '10px 25px',
        borderRadius: '30px',
        fontWeight: '500',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      {label}
    </button>
  );
};
