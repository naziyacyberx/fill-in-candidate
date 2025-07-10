import React, { useState } from 'react';
import CreateJobBasicInfo from '../../components/recruiter/CreateJobBasicInfo';
import Compensation from '../../components/recruiter/CreateJobCompensation';
import JobDetails from '../../components/recruiter/CreateJobDetails';
import AdditionalInfo from '../../components/recruiter/CreateJobAdditionalInfo';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    short_address: '',
    profession: 1,
    salary_range_from: '',
    salary_range_to: '',
    benefits: [],
    shift: [],
    experiance_level: '',
    job_description: '',
    software: [],
    expire_date: '',
    vacancy: 1,
    latitude: '28.543010973840886',
    longitude: '77.39980545281331',
  });

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      salary_range_from: Number(formData.salary_range_from),
      salary_range_to: Number(formData.salary_range_to),
      vacancy: Number(formData.vacancy),
    };

    try {
      const response = await fetch('https://fillin-admin.cyberxinfosolution.com/api/recruiter/create-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...` // Replace with full token
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Job created:', data);
      alert('Job created successfully!');
    } catch (error) {
      console.error('Error creating job:', error);
      alert('Failed to create job.');
    }
  };

  return (
    <div className='container'>
      <CreateJobBasicInfo formData={formData} setFormData={setFormData} />
      <Compensation formData={formData} setFormData={setFormData} />
      <JobDetails formData={formData} setFormData={setFormData} />
      <AdditionalInfo formData={formData} setFormData={setFormData} />

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
