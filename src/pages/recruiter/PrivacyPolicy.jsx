import React from "react";
import { Card } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <div className="container py-4" style={{ maxWidth: "1000px" }}>
      <h5><strong>Privacy Policy</strong></h5>
      <p className="text-muted">Last Updated: February 15, 2024</p>

      <Card className="p-4 shadow-sm border-0">
        <p>
          At DentalCare, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
        </p>

        <p className="border-start border-3 border-primary ps-3 bg-light">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
        </p>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
        </p>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
        </p>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
