import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const StaffingRequirementsForm = ({ profile, setprofile, dropdownData }) => {
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [hireType, setHireType] = useState('');
  const [workingHours, setWorkingHours] = useState([
  {
    key: 'Weekdays',
    value: 1,
  },
  {
    key: 'Weekends',
    value: 2,
  },
  {
    key: 'Morning',
    value: 3,
  },
  {
    key: 'Afternoon',
    value: 4,
  },
  {
    key: 'Evening',
    value: 5,
  },
  {
    key: 'Flexible',
    value: 6,
  },

  ]);
  const [softwareUsed, setSoftwareUsed] = useState([]);

  const staffOptions = [
    'Dentist', 'Dental Assistant', 'Receptionist', 'Hygienist', 'Therapist', 'Specialist'
  ];

  // const workingHourOptions = [
  //   'Weekdays', 'Weekends', 'Morning', 'Afternoon', 'Evening', 'Flexible'
  // ];

  const softwareOptions = [
    'Dental 4 Windows', 'Oasis', 'Exact', 'Pratika', 'D4W (Centaur)', 'Medirecords', 'Core Practice', 'Other'
  ];

  const lookingForData = [
  {
    key: 'Temporary Fill-Ins',
    value: 1,
  },
  {
    key: 'Permanent Hires',
    value: 2,
  },
  {
    key: 'Both',
    value: 3,
  },
];
// const workingHours = [
//   {
//     key: 'Weekdays',
//     value: 1,
//   },
//   {
//     key: 'Weekends',
//     value: 2,
//   },
//   {
//     key: 'Morning',
//     value: 3,
//   },
//   {
//     key: 'Afternoon',
//     value: 4,
//   },
//   {
//     key: 'Evening',
//     value: 5,
//   },
//   {
//     key: 'Flexible',
//     value: 6,
//   },
// ];

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
        primarly_looking,
        working_hours = [],
        use_software = []
      } = profile;

      // Convert index-based values to labels
      const mappedDentistry = dentistry.map(id => staffOptions[id - 1]).filter(Boolean);
      const mappedSoftware = use_software.map(id => softwareOptions[id - 1]).filter(Boolean);

      setSelectedStaff(mappedDentistry);
      setHireType(
        primarly_looking === 'Temporary Fill-Ins' ? 'Temporary'
        : primarly_looking === 'Permanent Hires' ? 'Permanent'
        : primarly_looking === 'Both' ? 'Both'
        : ''
      );
      setWorkingHours(working_hours);
      setSoftwareUsed(mappedSoftware);
    }
  }, [profile]);

  return (
    <div className="container py-4" >
      <h5><strong>Staffing Requirements</strong></h5>
      <p className="text-muted">Staffing Needs & Preferences</p>

      {/* Staff Types */}   
      <Form.Group className="mb-3">
        <Form.Label><strong>What types of staff are you looking for:</strong></Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {dropdownData?.profession?.map((staff,i) => (
            <Form.Check
              key={staff.value}
              inline
              type="checkbox"
              label={staff.key}
              checked={selectedStaff.includes(staff)}
              onChange={() => toggleSelection(staff, selectedStaff, setSelectedStaff)}
            />
          ))}
        </div>
      </Form.Group>

      {/* Hire Type */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Are you primarily looking for</strong></Form.Label>
        <div className="d-flex flex-wrap gap-4 mt-2">
          <Form.Check
            type="radio"
            name="hireType"
            label="Temporary Fill-Ins"
            checked={hireType === 'Temporary'}
            onChange={() => setHireType('Temporary')}
          />
          <Form.Check
            type="radio"
            name="hireType"
            label="Permanent Hires"
            checked={hireType === 'Permanent'}
            onChange={() => setHireType('Permanent')}
          />
          <Form.Check
            type="radio"
            name="hireType"
            label="Both"
            checked={hireType === 'Both'}
            onChange={() => setHireType('Both')}
          />
        </div>
      </Form.Group>

      {/* Working Hours */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Typical Working Hours</strong></Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {workingHours.map((hour) => (
            <Form.Check
              key={hour.value}
              inline
              type="checkbox"
              label={hour.key}
              checked={workingHours.includes(hour.key)}
              onChange={() => toggleSelection(hour, workingHours, setWorkingHours)}
            />    
          ))}
        </div>
      </Form.Group>

      {/* Software Used */}
      <Form.Group className="mb-3">
        <Form.Label><strong>What Software does your practice use?</strong></Form.Label>
        <div className="d-flex flex-wrap gap-3 mt-2">
          {softwareOptions.map((soft) => (
            <Form.Check
              key={soft}
              inline
              type="checkbox"
              label={soft}
              checked={softwareUsed.includes(soft)}
              onChange={() => toggleSelection(soft, softwareUsed, setSoftwareUsed)}
            />
          ))}
        </div>
      </Form.Group>
    </div>
  );
};

export default StaffingRequirementsForm;
