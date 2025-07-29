import React, { useRef, useState, useEffect } from 'react';
import CreateJobBasicInfo from '../../components/recruiter/CreateJobBasicInfo';
import Compensation from '../../components/recruiter/CreateJobCompensation';
import JobDetails from '../../components/recruiter/CreateJobDetails';
import AdditionalInfo from '../../components/recruiter/CreateJobAdditionalInfo';
import { baseUrl } from '../../utils/BaseUrl';
import { SuccessToaster } from '../../utils/Toaster';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const navigate = useNavigate()
  const [dropdownData,setDropdownData] = useState();
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    short_address: '',
    profession: '',
    salary_range_from: '',
    salary_range_to: '',
    benefits: [],
    shift: [],
    experiance_level: '',
    job_description: '',
    software: [],
    expire_date: '',
    vacancy: 1,
    latitude: '',
    longitude: '',

  });

    useEffect(() => {
      const fetchDropdownData = async () => {
        try {
          const response = await axios.post(
            `${baseUrl}recruiter/get-dropdown-data`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization:
                  `Bearer  ${localStorage.getItem("recruiterToken")}`,
              },
            }
          );
  
           console.log("response", response);
           
          if (response.data?.statusCode === 200) {
            setDropdownData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching dropdown data:", error);
        }
      };
  
      fetchDropdownData();
    }, []);
  

const basicInfoRef = useRef();
const compensationRef = useRef(); // ✅ Add this line
const jobDetailsRef = useRef(); // ✅ Add this line



  const handleSubmit = async () => {
    // ✅ Run validation
    if (!basicInfoRef.current.validate() || !compensationRef.current.validate()  ) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

     const isValid = jobDetailsRef.current.validate(); // your validate logic
  if (!isValid) {
    // prevent scrolling up
    // optionally scroll to component
    jobDetailsRef.current?.scrollIntoView?.({ behavior: "smooth" });
    return;
  }
    const payload = {
      ...formData,
      salary_range_from: Number(formData.salary_range_from),
      salary_range_to: Number(formData.salary_range_to),
      vacancy: Number(formData.vacancy),
      profession: Number(formData.profession),
    };

    try {
      const response = await fetch(`${baseUrl}recruiter/create-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem("recruiterToken")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Job created:', data);
      SuccessToaster('Job created successfully!');
      navigate("/recruiter/posted-jobs")
      
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job.');
    }
  };

  return (
    <div className='container'>
      <h5 className='p-4'><strong>Create Job</strong></h5>

      <CreateJobBasicInfo
      dropdownData={dropdownData}
        ref={basicInfoRef}
        formData={formData}
        setFormData={setFormData}
      />
      <Compensation   ref={compensationRef} formData={formData} setFormData={setFormData} />
      <JobDetails ref={jobDetailsRef} formData={formData} setFormData={setFormData} />
      {/* <AdditionalInfo formData={formData} setFormData={setFormData} /> */}

      <div className="d-flex justify-content-center gap-3 mt-5">
        <button
          className="px-4 py-2 text-white border-0 rounded-pill"
          style={{ background: "linear-gradient(to right, #0066ff, #33ccff)", minWidth: "150px" }}
          type="button"
          onClick={handleSubmit}
        >
          Create Job
        </button>

        <button
          className="px-4 py-2 bg-light text-dark border-0 rounded-pill"
          style={{ minWidth: "150px" }}
          type="button"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateJob;
