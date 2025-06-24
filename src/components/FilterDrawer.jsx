import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/filterdrawer.css";

const FilterDrawer = ({
  isOpen,
  onClose,
  selectedSoftware = [],
  setSelectedSoftware = () => {},
  selectedProfessions = [],
  setSelectedProfessions = () => {},
  selectedShifts = [],
  setSelectedShifts = () => {},
  selectedExperienceLevels = [],
  setSelectedExperienceLevels = () => {},
  onApply,
}) => {
  const [dropdownData, setDropdownData] = useState({
    profession: [],
    software: [],
  });

  // 🔃 Fetch dropdown options from API
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.post(
          "https://fill-in.cyberxinfosolution.com/api/recruiter/get-dropdown-data",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2ZpbGwtaW4uY3liZXJ4aW5mb3NvbHV0aW9uLmNvbS9hcGkvY2FuZGlkYXRlL2xvZ2luIiwiaWF0IjoxNzUwNDIzNTMwLCJleHAiOjE3NTMwMTU1MzAsIm5iZiI6MTc1MDQyMzUzMCwianRpIjoiYkJybDRSeTdEaGVDOTBqSiIsInN1YiI6IjM1IiwicHJ2IjoiODYxYjA1NjMxMDkxMzU3ZWM4ZTU1ZjJhZjE3ZTExMThmNzJmNzBkYyJ9.8kSM2LwawEWaEi0a3qbnMUOD1YZDZUwnLoesFf_1IPk",
            },
          }
        );

        if (response.data?.statusCode === 200) {
          setDropdownData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  if (!isOpen) return null;

  const handleCheckboxChange = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="filter-drawer">
      <div className="drawer-header">
        <h5>Search Filter</h5>
      </div>

      <div className="drawer-body">
        <div className="mb-3">
          <label><strong>Software Experience</strong></label>
          {dropdownData.software.map((s) => (
            <div key={s.value}>
              <input
                type="checkbox"
                checked={selectedSoftware.includes(s.key)}
                onChange={() =>
                  handleCheckboxChange(s.key, selectedSoftware, setSelectedSoftware)
                }
              />{" "}
              {s.key}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label><strong>Profession</strong></label>
          {dropdownData.profession.map((p) => (
            <div key={p.value}>
              <input
                type="checkbox"
                checked={selectedProfessions.includes(p.key)}
                onChange={() =>
                  handleCheckboxChange(p.key, selectedProfessions, setSelectedProfessions)
                }
              />{" "}
              {p.key}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label><strong>Shift</strong></label>
          {["Weekdays", "Weekends", "Morning", "Afternoon", "Evening", "Flexible"].map((shift) => (
            <div key={shift}>
              <input
                type="checkbox"
                checked={selectedShifts.includes(shift)}
                onChange={() =>
                  handleCheckboxChange(shift, selectedShifts, setSelectedShifts)
                }
              />{" "}
              {shift}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label><strong>Experience Level</strong></label>
          {["0-1 Years", "1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"].map((exp) => (
            <div key={exp}>
              <input
                type="checkbox"
                checked={selectedExperienceLevels.includes(exp)}
                onChange={() =>
                  handleCheckboxChange(exp, selectedExperienceLevels, setSelectedExperienceLevels)
                }
              />{" "}
              {exp}
            </div>
          ))}
        </div>

        <button className="btn btn-primary w-100" onClick={onApply}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterDrawer;
