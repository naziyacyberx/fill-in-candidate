import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const StaffingRequirementsForm = ({ profile, setProfile, dropdownData }) => {
  const [workingHourOptions] = useState([
    { key: 'Weekdays', value: 1 },
    { key: 'Weekends', value: 2 },
    { key: 'Morning', value: 3 },
    { key: 'Afternoon', value: 4 },
    { key: 'Evening', value: 5 },
    { key: 'Flexible', value: 6 },
  ]);
  const [workingHours, setWorkingHours] = useState([]);

  const lookingForData = [
    { key: 'Temporary Fill-Ins', value: 1 },
    { key: 'Permanent Hires', value: 2 },
    { key: 'Both', value: 3 },
  ];

  const toggleSelection = (option, state, setState) => {
    if (state.includes(option)) {
      setState(state.filter(item => item !== option));
    } else {
      setState([...state, option]);
    }
  };

 useEffect(() => {
  if (profile) {
    const {
      dentistry = [],
      working_hours = [],
    } = profile;

    const mappedDentistry = dentistry.map(id => staffOptions[id - 1]).filter(Boolean);


    const cleanWorkingHours = working_hours.filter(hour =>
      workingHourOptions.some(opt => opt.key === hour)
    );
    const isSameHours = JSON.stringify(workingHours) === JSON.stringify(cleanWorkingHours);
    if (!isSameHours) {
      setWorkingHours(cleanWorkingHours);
    }
  }
}, [profile]);



useEffect(() => {
  if (workingHours.length > 0) {
    const isSame = JSON.stringify(profile.working_hours || []) === JSON.stringify(workingHours);
    if (!isSame) {
      setProfile(prev => ({
        ...prev,
        working_hours: workingHours
      }));
    }
  }
}, [workingHours, profile]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleStaffSelection = (value) => {
    const current = profile?.looking || [];
    const updated = current.includes(value)
      ? current.filter(id => id !== value)
      : [...current, value];

    setProfile(prev => ({
      ...prev,
      looking: updated,
    }));
  };

  return (
    <div className="container py-4">
      <h5><strong>Staffing Requirements</strong></h5>
      <p className="text-muted">Staffing Needs & Preferences</p>

      {/* What type of staff are you looking for */}
      <Form.Group className="mb-3">
        <Form.Label><strong>What types of staff are you looking for:</strong></Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {dropdownData?.profession?.map((staff) => (
            <Form.Check
              key={staff.value}
              inline
              type="checkbox"
              label={staff.key}
              checked={profile?.looking?.includes(staff.value)}
              onChange={() => toggleStaffSelection(staff.value)}
            />
          ))}
        </div>
      </Form.Group>

      {/* Hire Type */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Are you primarily looking for</strong></Form.Label>
        <div className="d-flex flex-wrap gap-4 mt-2">
          {lookingForData.map((option) => (
            <Form.Check
              key={option.value}
              type="radio"
              name="primarly_looking"
              label={option.key}
              value={option.key}
              checked={profile?.primarly_looking === option.key}
              onChange={() =>
                setProfile(prev => ({
                  ...prev,
                  primarly_looking: option.key
                }))
              }
            />
          ))}
        </div>
      </Form.Group>

      {/* Working Hours */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Typical Working Hours</strong></Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {workingHourOptions?.map((hour) => (
            <Form.Check
              key={hour.value}
              inline
              type="checkbox"
              label={hour.key}
              checked={workingHours.includes(hour.key)}
              onChange={() => toggleSelection(hour.key, workingHours, setWorkingHours)}
            />
          ))}
        </div>
      </Form.Group>

      {/* Software Used */}
      <Form.Group className="mb-3">
        <Form.Label><strong>What Software does your practice use?</strong></Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {dropdownData?.software?.map((soft) => (
            <Form.Check
              key={soft.value}
              inline
              type="checkbox"
              label={soft?.key}
              checked={profile?.use_software?.includes(soft.value)}
              onChange={() => {
                const updated = profile?.use_software?.includes(soft.value)
                  ? profile?.use_software.filter(id => id !== soft.value)
                  : [...(profile?.use_software || []), soft.value];

                setProfile(prev => ({
                  ...prev,
                  use_software: updated
                }));
              }}
            />
          ))}
        </div>
      </Form.Group>
    </div>
  );
};

export default StaffingRequirementsForm;
