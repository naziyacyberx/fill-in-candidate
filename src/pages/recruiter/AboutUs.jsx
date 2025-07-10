import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { FaUserMd, FaCity, FaStar } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container py-4" style={{ maxWidth: "1000px" }}>
      <h5 className="mb-4"><strong>About Us</strong></h5>

      <Row className="align-items-center">
        <Col md={6}>
          <Image
            src="https://via.placeholder.com/400x300?text=Dentist+Image"
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <h6><strong>Dental Assistant</strong></h6>
          <p className="text-muted" style={{ fontSize: "14px" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>

          <Row className="mt-4">
            <Col xs={4}>
              <Card className="text-center p-3 shadow-sm">
                <FaUserMd className="text-primary fs-4 mb-2" />
                <h6 className="mb-0">200+</h6>
                <small className="text-muted">Dentist Jobs</small>
              </Card>
            </Col>
            <Col xs={4}>
              <Card className="text-center p-3 shadow-sm">
                <FaCity className="text-primary fs-4 mb-2" />
                <h6 className="mb-0">100+</h6>
                <small className="text-muted">Cities</small>
              </Card>
            </Col>
            <Col xs={4}>
              <Card className="text-center p-3 shadow-sm">
                <FaStar className="text-warning fs-4 mb-2" />
                <h6 className="mb-0">4.9/5</h6>
                <small className="text-muted">Ratings</small>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <p className="mt-4 text-muted" style={{ fontSize: "14px" }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm border-0 bg-light">
            <h6 className="mb-2 text-primary"><strong>Our Mission</strong></h6>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
            </p>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow-sm border-0 bg-light">
            <h6 className="mb-2 text-primary"><strong>Our Vision</strong></h6>
            <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
