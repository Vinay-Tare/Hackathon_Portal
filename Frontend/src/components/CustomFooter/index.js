import React from "react";
import incedologo from "../../assets/images/navbarImages/incedo.png";
import "./index.css";
import {
  BsFillEnvelopeFill,
  BsFillGeoAltFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";
import { useLocation } from "react-router-dom";

const CustomFooter = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/home" && (
        <Container fluid className="search-text">
          <Form>
            <Row className="gy-3 align-items-center justify-content-center">
              <Col xs={12} className="text-center">
                <Label
                  tag="h4"
                  className="search-text-label"
                  htmlFor="search-input"
                >
                  SIGN UP TO OUR NEWSLETTER
                </Label>
              </Col>
              <Col xs={12} md={5}>
                <Input
                  id="search-input"
                  type="text"
                  className="search-text-input"
                  placeholder="Email Address"
                />
              </Col>
              <Col xs={12} className="text-center">
                <Button type="submit" className="custom-button py-2 px-3">
                  SUBMIT
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
      <footer>
        <Container>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <span className="logo">
                <img
                  className="img-footer"
                  src={incedologo}
                  height="70"
                  alt="incedo-logo"
                />
              </span>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ul className="menu">
                <span>Industries</span>
                <li>
                  <a href="https://www.incedoinc.com/financial-services/">
                    Finanical Services
                  </a>
                </li>
                <li>
                  <a href="https://www.incedoinc.com/life-sciences/">
                    Life Sciences
                  </a>
                </li>
                <li>
                  <a href="https://www.incedoinc.com/product-engineering/">
                    Product Engineering
                  </a>
                </li>
                <li>
                  <a href="https://www.incedoinc.com/telecom/">
                    Telecommunication
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <ul className="address">
                <span>Contact Us</span>
                <li>
                  <BsFillTelephoneFill className="fa" aria-hidden="true" />
                  <a href="/">Phone</a>
                </li>
                <li>
                  <BsFillGeoAltFill className="fa" aria-hidden="true" />
                  <a href="/">Address</a>
                </li>
                <li>
                  <BsFillEnvelopeFill className="fa" aria-hidden="true" />
                  <a href="/">Email</a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="text-white" />
          <Row>
            <Col>
              <p className="text-muted text-center">
                © Copyright Incedo Inc. 2023
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default CustomFooter;
