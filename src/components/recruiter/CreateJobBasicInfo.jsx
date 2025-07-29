import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateJobBasicInfo = forwardRef(
  ({ formData, setFormData, dropdownData }, ref) => {
    const [jobTitle, setJobTitle] = useState(formData.title || "");
    const [department, setDepartment] = useState(formData.department || "");
    const [profession, setProfession] = useState(formData.profession || "");
    const [shortAddress, setShortAddress] = useState("");
    const [location, setLocation] = useState(formData.address || null);
    const [vacancy, setVacancy] = useState(formData.vacancy || null)
    const [employmentType, setEmploymentType] = useState(
      formData.employmentType || ""
    );
    const [software, setSoftware] = useState(formData.software || "");
    const [validated, setValidated] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const employmentOptions = [
      "Full Time",
      "Part Time",
      "Contract",
      "Internship",
    ];

    useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        title: jobTitle,
        department: department,
        software: software,
        profession: profession,
        address: location?.label,
        short_address: location?.value?.structured_formatting?.main_text,
        employmentType: employmentType,
        latitude: lat,
        longitude: lng,
        vacancy: Number(vacancy)
      }));
    }, [
      jobTitle,
      department,
      profession,
      software,
      location,
      employmentType,
      setFormData,
      lat,
      lng,
    ]);

    // const handleEmploymentClick = (type) => {
    //   setEmploymentType(type);
    //   setSoftware([...software,type.value])
    // };
    const handleSoftwareClick = (type) => {
      const value = type.value;
      setSoftware(
        (prevSelected) =>
          prevSelected.includes(value)
            ? prevSelected.filter((item) => item !== value) // remove if already selected
            : [...prevSelected, value] // add if not selected
      );
    };

    const handleSelect = (val) => {
      setLocation(val);
      setShortAddress(val);
      setIsFocused(false);
      const placeId = val.value.place_id; // ✅ extract placeId correctly

      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          console.log("lat lng", latitude, longitude);

          setLat(latitude.toString());
          setLng(longitude.toString());
        } else {
          console.error("Place details fetch failed:", status);
        }
      });
    };

    // Expose validate method to parent
    useImperativeHandle(ref, () => ({
      validate: () => {
        setValidated(true);
        return jobTitle && profession && location && software ;
      },
    }));

    return (
      <Card className="m-4 p-4 shadow-sm border border-primary-subtle">
        <h6 className="mb-3">
          <strong>Basic Information</strong>
        </h6>
        <Form noValidate validated={validated}>
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              required
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Dentist Expert"
            />
            <Form.Control.Feedback type="invalid">
              Job Title is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              required
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            >
              <option value="">Select Department</option>
              {dropdownData?.profession?.map((item, i) => (
                <>
                  <option key={i} value={item.value}>
                    {item.key}
                  </option>
                </>
              ))}
              {/* <option value="Dentist">Dentist</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Hygienist">Hygienist</option> */}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Department is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <div
              className={
                validated && !location ? "border border-danger rounded p-1" : ""
              }
            >
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                selectProps={{
                  value: location,
                  onChange: handleSelect,
                  onFocus: () => setIsFocused(true),
                  placeholder: "Enter Location",
                  styles: {
                    control: (base) => ({
                      ...base,
                      borderRadius: "6px",
                      minHeight: "45px",
                      boxShadow: "none",
                      borderColor:
                        validated && !location ? "red" : base.borderColor,
                    }),
                  },
                }}
                autocompletionRequest={{ types: ["(cities)"] }}
              />
            </div>
            {validated && !location && (
              <div className="text-danger mt-1">Location is required.</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Software</Form.Label>
            <Row>
              {dropdownData?.software?.map((type, idx) => (
                <Col xs={6} sm={6} md={3} key={idx} className="mb-2">
                  <Button
                    variant={
                      software.includes(type.value)
                        ? "primary"
                        : "outline-secondary"
                    }
                    onClick={() => handleSoftwareClick(type)}
                    className="w-100"
                  >
                    {type.key}
                  </Button>
                </Col>
              ))}
            </Row>
            {validated && software.length === 0 && (
              <div className="text-danger mt-1">
                At least one software must be selected.
              </div>
            )}
          </Form.Group>



          <Form.Group className="mb-3">
  <Form.Label>Vacancy</Form.Label>
  <Form.Control
    required
    type="number"
    min={1}
    value={vacancy}
    onChange={(e) => setVacancy(e.target.value)}
    placeholder="Enter number of vacancies"
  />
  <Form.Control.Feedback type="invalid">
    Vacancy is required.
  </Form.Control.Feedback>
</Form.Group>
  
        </Form>
      </Card>
    );
  }
);

export default CreateJobBasicInfo;
