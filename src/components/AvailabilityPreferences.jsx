import React from "react";
import { Form, Button } from "react-bootstrap";

const AvailabilityPreferences = ({ formData, handleChange }) => {
  return (
    <>
      <h5 className="mt-4"><strong>Availability & Preferences</strong></h5>

      {/* Joining Availability */}
      <Form.Group className="mb-3">
        <div className="d-flex gap-3 flex-wrap">
          {["Immediate Joiner", "15 Days", "30 Days", "30+ Days"].map((label) => (
            <Form.Check
              inline
              key={label}
              type="radio"
              label={label}
              name="availability_time"
              value={label}
              checked={formData.availability_time === label}
              onChange={(e) => handleChange("availability_time", e.target.value)}
            />
          ))}
        </div>
      </Form.Group>

      {/* Location */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </Form.Group>

      {/* Travel Radius */}
      <Form.Group className="mb-3">
        <Form.Label>Travel Radius</Form.Label>
        <div className="d-flex gap-2 flex-wrap">
          {["5 km", "10 km", "15 km", "20 km"].map((km) => (
            <Button
              key={km}
              variant={formData.travel_radius === km ? "primary" : "light"}
              onClick={() => handleChange("travel_radius", km)}
            >
              {km}
            </Button>
          ))}
        </div>
      </Form.Group>

      {/* Hourly Rate */}
      <Form.Group className="mb-3">
        <Form.Label>Preferred Hourly Rate</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter hourly rate"
          value={formData.hourly_rate}
          onChange={(e) => handleChange("hourly_rate", e.target.value)}
        />
      </Form.Group>

      {/* Flexible on Pay */}
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Flexible on Pay"
          checked={formData.flexible_pay === true}
          onChange={(e) => handleChange("flexible_pay", e.target.checked)}
        />
      </Form.Group>

      {/* Short Notice */}
      <Form.Group className="mb-3">
        <Form.Label>Willing to Work on Short Notice?</Form.Label>
        <div className="d-flex gap-3">
          <Form.Check
            inline
            type="radio"
            label="YES"
            name="short_notice"
            value="YES"
            checked={formData.short_notice === "YES"}
            onChange={(e) => handleChange("short_notice", e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="NO"
            name="short_notice"
            value="NO"
            checked={formData.short_notice === "NO"}
            onChange={(e) => handleChange("short_notice", e.target.value)}
          />
        </div>
      </Form.Group>

      {/* Permanent Opportunity */}
      <Form.Group className="mb-3">
        <Form.Label>Open to Permanent Opportunities?</Form.Label>
        <div className="d-flex gap-3">
          <Form.Check
            inline
            type="radio"
            label="YES"
            name="permanent_opportunities"
            value="YES"
            checked={formData.permanent_opportunities === "YES"}
            onChange={(e) => handleChange("permanent_opportunities", e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            label="NO"
            name="permanent_opportunities"
            value="NO"
            checked={formData.permanent_opportunities === "NO"}
            onChange={(e) => handleChange("permanent_opportunities", e.target.value)}
          />
        </div>
      </Form.Group>
    </>
  );
};

export default AvailabilityPreferences;
