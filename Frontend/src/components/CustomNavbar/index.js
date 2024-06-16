import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import imgs from "../../assets/images/navbarImages/incedo.png";
import useAuth from "../../hooks/useAuth";
import "./index.css";

const CustomNavbar = () => {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      var headerOffset = 70;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Navbar fixed="top" color="dark" dark expand="md">
      <NavbarBrand href="/">
        <img
          src={imgs}
          className="ms-5"
          height="40"
          width="150"
          alt="incedo_logo"
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {location.pathname === "/home" && (
            <>
              <NavItem
                onClick={() => handleScroll("about")}
                className="txt-nav"
              >
                About
              </NavItem>
              <NavItem
                onClick={() => handleScroll("domain")}
                className="txt-nav"
              >
                Domains
              </NavItem>
              <NavItem
                onClick={() => handleScroll("judging")}
                className="txt-nav"
              >
                Judging
              </NavItem>
              <NavItem
                onClick={() => handleScroll("benefits")}
                className="txt-nav"
              >
                Benefits
              </NavItem>
              <NavItem
                onClick={() => handleScroll("contact")}
                className="txt-nav"
              >
                Contact
              </NavItem>
              <NavItem
                onClick={() => handleScroll("winners")}
                className="txt-nav"
              >
                Winners
              </NavItem>
            </>
          )}
          <NavItem>
            {isAuth ? (
              <Button
                block
                className="custom-button"
                onClick={() => {
                  logout();
                }}
              >
                LOGOUT
              </Button>
            ) : location.pathname === "/login" ? (
              <Button
                block
                className="custom-button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                REGISTER
              </Button>
            ) : (
              <Button
                block
                className="custom-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
              </Button>
            )}
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default CustomNavbar;
