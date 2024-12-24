import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-orange-800 text-white py-4">
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3">
            <h5 className="text-uppercase fw-bold">About Us</h5>
            <p className="text-gray-400">
              We provide high-quality furniture at affordable prices. Our
              mission is to make your home beautiful and functional.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h5 className="text-uppercase fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/home" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h5 className="text-uppercase fw-bold">Contact Us</h5>
            <p className="text-gray-400">
              <i className="fas fa-map-marker-alt me-2"></i>1234 Furniture St.,
              New Delhi, India
            </p>
            <p className="text-gray-400">
              <i className="fas fa-phone me-2"></i>+91 9876543210
            </p>
            <p className="text-gray-400">
              <i className="fas fa-envelope me-2"></i>info@furniturestore.com
            </p>
          </Col>
        </Row>

        <hr className="border-gray-700 my-3" />

        <Row>
          <Col className="text-center">
            <p className="mb-0 text-gray-400">
              © {new Date().getFullYear()} Furniture Store. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
